// API configuration
const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

export const API_ENDPOINTS = {
  base: API_BASE_URL,
  documents: {
    upload: `${API_BASE_URL}/api/documents/upload`,
    analyzeText: `${API_BASE_URL}/api/documents/analyze-text`,
  },
  analysis: {
    getMessages: (analysisId: string) => `${API_BASE_URL}/api/analysis/${analysisId}/messages`,
    askQuestion: (analysisId: string) => `${API_BASE_URL}/api/analysis/${analysisId}/question`,
  },
};

export default API_ENDPOINTS;