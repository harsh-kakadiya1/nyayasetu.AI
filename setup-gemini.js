// Quick Gemini API Test Script
import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

async function testGeminiConnection() {
  console.log('🔍 Testing Gemini API connection...');
  
  // Check if API key is loaded
  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY not found in environment variables');
    console.log('📝 Please create a .env file with: GEMINI_API_KEY=your_api_key_here');
    return;
  }
  
  if (process.env.GEMINI_API_KEY === 'your_actual_api_key_here') {
    console.error('❌ Please replace "your_actual_api_key_here" with your actual Gemini API key');
    return;
  }
  
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    console.log('🚀 Sending test request to Gemini...');
    const result = await model.generateContent("Say 'Hello from NyayaSetu AI!' in one sentence.");
    const response = await result.response;
    
    console.log('✅ Gemini API is working!');
    console.log('📤 Response:', response.text());
    console.log('🎉 Your NyayaSetu AI is ready to analyze legal documents!');
    
  } catch (error) {
    console.error('❌ Gemini API Error:', error.message);
    
    if (error.message.includes('API_KEY_INVALID')) {
      console.log('💡 Your API key appears to be invalid. Please check:');
      console.log('   1. Visit https://aistudio.google.com/app/apikey');
      console.log('   2. Create a new API key');
      console.log('   3. Update your .env file with the correct key');
    } else if (error.message.includes('quota')) {
      console.log('💡 You may have exceeded your API quota. Check your usage at Google AI Studio.');
    }
  }
}

testGeminiConnection();
