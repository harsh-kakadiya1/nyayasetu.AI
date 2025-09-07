import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

console.log('Testing Gemini API connection...');
console.log('API Key present:', !!process.env.GEMINI_API_KEY);
console.log('API Key starts with AIzaSy:', process.env.GEMINI_API_KEY?.startsWith('AIzaSy'));

if (!process.env.GEMINI_API_KEY) {
  console.error('❌ No API key found');
  process.exit(1);
}

try {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  
  console.log('Sending test request...');
  const result = await model.generateContent("Say hello in one word");
  const response = await result.response;
  
  console.log('✅ SUCCESS! Gemini responded:', response.text());
} catch (error) {
  console.error('❌ ERROR:', error.message);
  if (error.message.includes('API_KEY_INVALID')) {
    console.log('Your API key is invalid. Please check it at https://aistudio.google.com/app/apikey');
  }
}
