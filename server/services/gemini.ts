import { GoogleGenerativeAI } from "@google/generative-ai";

// Debug API key loading
console.log('🔍 Gemini API Key Status:', {
  present: !!process.env.GEMINI_API_KEY,
  length: process.env.GEMINI_API_KEY?.length || 0,
  startsWithAI: process.env.GEMINI_API_KEY?.startsWith('AIzaSy') || false
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export interface DocumentSummary {
  summary: string;
  keyTerms: {
    employer?: string;
    employee?: string;
    salary?: string;
    startDate?: string;
    probation?: string;
  };
  documentType: string;
}

export interface RiskItem {
  level: "high" | "medium" | "low";
  title: string;
  description: string;
  section?: string;
}

export interface Clause {
  title: string;
  originalText: string;
  simplifiedText: string;
  section?: string;
}

export interface Recommendation {
  priority: number;
  title: string;
  description: string;
  actionType: "review" | "negotiate" | "legal" | "clarify";
}

export interface FullAnalysis {
  summary: DocumentSummary;
  riskItems: RiskItem[];
  clauses: Clause[];
  recommendations: Recommendation[];
  wordCount: number;
  riskLevel: "high" | "medium" | "low";
}

export async function analyzeDocument(content: string, documentType?: string, language: string = 'en'): Promise<FullAnalysis> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
  
  const languageInstructions = {
    'en': 'Respond in English with clear, jargon-free explanations.',
    'hi': 'हिंदी में जवाब दें और कानूनी शब्दजाल को सरल भाषा में समझाएं।',
    'gu': 'ગુજરાતીમાં જવાબ આપો અને કાનૂની શબ્દજાળને સરળ ભાષામાં સમજાવો।',
    'mr': 'मराठीत उत्तर द्या आणि कायदेशीर शब्दजाल सोप्या भाषेत समजावून सांगा।',
    'ta': 'தமிழில் பதிலளிக்கவும் மற்றும் சட்ட வார்த்தைகளை எளிய மொழியில் விளக்கவும்.',
    'bn': 'বাংলায় উত্তর দিন এবং আইনি পরিভাষাগুলি সহজ ভাষায় ব্যাখ্যা করুন।'
  };
  
  const systemPrompt = `You are a legal document analysis expert. Analyze the provided legal document and provide a comprehensive breakdown in JSON format.

Your analysis should include:
1. A plain-language summary with key terms extracted
2. Risk assessment with specific items flagged by severity
3. Key clauses broken down with original and simplified text
4. Actionable recommendations prioritized by importance

Focus on:
- Clear, jargon-free explanations
- Identifying unusual or potentially problematic terms
- Providing practical, actionable advice
- Risk assessment using "high", "medium", "low" levels

Language Instructions: ${languageInstructions[language as keyof typeof languageInstructions] || languageInstructions['en']}

Document type context: ${documentType || "auto-detect"}

Respond with valid JSON matching this structure:
{
  "summary": {
    "summary": "string",
    "keyTerms": {
      "employer": "string",
      "employee": "string", 
      "salary": "string",
      "startDate": "string",
      "probation": "string"
    },
    "documentType": "string"
  },
  "riskItems": [
    {
      "level": "high|medium|low",
      "title": "string",
      "description": "string",
      "section": "string"
    }
  ],
  "clauses": [
    {
      "title": "string",
      "originalText": "string",
      "simplifiedText": "string",
      "section": "string"
    }
  ],
  "recommendations": [
    {
      "priority": number,
      "title": "string", 
      "description": "string",
      "actionType": "review|negotiate|legal|clarify"
    }
  ],
  "wordCount": number,
  "riskLevel": "high|medium|low"
}`;

  try {
    console.log('🚀 Starting Gemini analysis...');
    console.log('📄 Content length:', content.length);
    console.log('🌍 Language:', language);
    
    // Retry logic for API overload
    const maxRetries = 3;
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`📞 Gemini API attempt ${attempt}/${maxRetries}`);
        
        const result = await model.generateContent({
          contents: [{ role: "user", parts: [{ text: `${systemPrompt}\n\nDocument to analyze:\n\n${content}` }] }],
          generationConfig: {
            responseMimeType: "application/json",
          },
        });

        console.log('✅ Gemini API call successful');
        const response = await result.response;
        const analysisText = response.text();
        
        console.log('📝 Response length:', analysisText?.length || 0);
        
        if (!analysisText) {
          throw new Error("Empty response from Gemini API");
        }

        console.log('🔍 Parsing JSON response...');
        const analysis: FullAnalysis = JSON.parse(analysisText);
        
        // Validate and ensure required fields
        if (!analysis.summary || !analysis.riskItems || !analysis.clauses || !analysis.recommendations) {
          console.error('❌ Invalid analysis structure:', {
            hasSummary: !!analysis.summary,
            hasRiskItems: !!analysis.riskItems,
            hasClauses: !!analysis.clauses,
            hasRecommendations: !!analysis.recommendations
          });
          throw new Error("Invalid analysis structure from Gemini API");
        }

        console.log('✅ Analysis completed successfully');
        return analysis;
        
      } catch (apiError: any) {
        lastError = apiError;
        
        // Check if it's an overload error (503 Service Unavailable)
        if (apiError.message?.includes('overloaded') || apiError.message?.includes('503')) {
          console.warn(`⚠️ API overloaded on attempt ${attempt}/${maxRetries}`);
          
          if (attempt < maxRetries) {
            // Exponential backoff: 2s, 4s, 8s
            const delay = Math.pow(2, attempt) * 1000;
            console.log(`⏳ Waiting ${delay}ms before retry...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            continue;
          }
        } else {
          // For non-overload errors, don't retry
          throw apiError;
        }
      }
    }
    
    // If we get here, all retries failed
    throw lastError || new Error("Failed to analyze document after multiple attempts");
    
  } catch (error) {
    console.error("❌ Gemini analysis error:", error);
    if (error instanceof SyntaxError) {
      console.error("📝 JSON Parse Error - Raw response:", error.message);
    }
    throw new Error(`Failed to analyze document: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function answerQuestion(documentContent: string, question: string, previousContext?: string, language: string = 'en'): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  
  const languageInstructions = {
    'en': 'Respond in English with clear, accessible language.',
    'hi': 'हिंदी में जवाब दें और स्पष्ट, सुलभ भाषा का उपयोग करें।',
    'gu': 'ગુજરાતીમાં જવાબ આપો અને સ્પષ્ટ, સુલભ ભાષાનો ઉપયોગ કરો।',
    'mr': 'मराठीत उत्तर द्या आणि स्पष्ट, सुलभ भाषेचा वापर करा।',
    'ta': 'தமிழில் பதிலளிக்கவும் மற்றும் தெளிவான, அணுகக்கூடிய மொழியைப் பயன்படுத்தவும்.',
    'bn': 'বাংলায় উত্তর দিন এবং স্পষ্ট, সুলভ ভাষা ব্যবহার করুন।'
  };
  
  const systemPrompt = `You are a legal document assistant. Answer questions about the provided legal document using only the information contained within it.

Rules:
- Base your answers solely on the document content
- If information isn't in the document, clearly state that
- Provide specific references to sections or clauses when possible
- Use clear, accessible language
- Keep responses concise but comprehensive

Language Instructions: ${languageInstructions[language as keyof typeof languageInstructions] || languageInstructions['en']}

${previousContext ? `Previous conversation context:\n${previousContext}\n\n` : ''}

Document content:\n${documentContent}

Question: ${question}`;

  try {
    // Retry logic for API overload
    const maxRetries = 3;
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`📞 QA API attempt ${attempt}/${maxRetries}`);
        
        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        const answer = response.text();
        
        if (!answer) {
          throw new Error("Empty response from Gemini API");
        }

        console.log('✅ QA response received successfully');
        return answer;
        
      } catch (apiError: any) {
        lastError = apiError;
        
        // Check if it's an overload error (503 Service Unavailable)
        if (apiError.message?.includes('overloaded') || apiError.message?.includes('503')) {
          console.warn(`⚠️ QA API overloaded on attempt ${attempt}/${maxRetries}`);
          
          if (attempt < maxRetries) {
            // Exponential backoff: 1s, 2s, 4s (shorter for QA)
            const delay = Math.pow(2, attempt - 1) * 1000;
            console.log(`⏳ Waiting ${delay}ms before QA retry...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            continue;
          }
        } else {
          // For non-overload errors, don't retry
          throw apiError;
        }
      }
    }
    
    // If we get here, all retries failed
    throw lastError || new Error("Failed to answer question after multiple attempts");
    
  } catch (error) {
    console.error("Gemini Q&A error:", error);
    throw new Error(`Failed to answer question: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
