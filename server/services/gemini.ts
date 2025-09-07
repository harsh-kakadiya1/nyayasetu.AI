import { GoogleGenerativeAI } from "@google/generative-ai";

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

export async function analyzeDocument(content: string, documentType?: string): Promise<FullAnalysis> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
  
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
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: `${systemPrompt}\n\nDocument to analyze:\n\n${content}` }] }],
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const response = await result.response;
    const analysisText = response.text();
    
    if (!analysisText) {
      throw new Error("Empty response from Gemini API");
    }

    const analysis: FullAnalysis = JSON.parse(analysisText);
    
    // Validate and ensure required fields
    if (!analysis.summary || !analysis.riskItems || !analysis.clauses || !analysis.recommendations) {
      throw new Error("Invalid analysis structure from Gemini API");
    }

    return analysis;
  } catch (error) {
    console.error("Gemini analysis error:", error);
    throw new Error(`Failed to analyze document: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function answerQuestion(documentContent: string, question: string, previousContext?: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  
  const systemPrompt = `You are a legal document assistant. Answer questions about the provided legal document using only the information contained within it.

Rules:
- Base your answers solely on the document content
- If information isn't in the document, clearly state that
- Provide specific references to sections or clauses when possible
- Use clear, accessible language
- Keep responses concise but comprehensive

${previousContext ? `Previous conversation context:\n${previousContext}\n\n` : ''}

Document content:\n${documentContent}

Question: ${question}`;

  try {
    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const answer = response.text();
    
    if (!answer) {
      throw new Error("Empty response from Gemini API");
    }

    return answer;
  } catch (error) {
    console.error("Gemini Q&A error:", error);
    throw new Error(`Failed to answer question: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
