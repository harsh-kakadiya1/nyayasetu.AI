import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.js";
import { insertDocumentSchema, insertAnalysisSchema, insertChatMessageSchema } from "./schema.js";
import { analyzeDocument, answerQuestion } from "./services/gemini.js";
import { parseTextContent, parseUploadedDocument } from "./services/documentParser.js";
import multer from "multer";
import path from "path";

// Configure multer for file uploads (memory storage - no files saved to disk)
const upload = multer({
  storage: multer.memoryStorage(), // Store in memory instead of disk
  limits: {
    fileSize:  15 * 1024 * 1024, // 15MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.pdf', '.docx', '.txt'];
    const ext = path.extname(file.originalname).toLowerCase();
    
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOCX, and TXT files are allowed.'));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/", (req, res) => {
    res.json({ 
      message: "NyayaSetu API Server is running!", 
      status: "healthy",
      timestamp: new Date().toISOString(),
      endpoints: [
        "POST /api/documents/upload",
        "POST /api/documents/analyze-text", 
        "GET /api/analysis/:id/messages",
        "POST /api/analysis/:id/chat"
      ]
    });
  });

  app.get("/health", (req, res) => {
    res.json({ status: "healthy", timestamp: new Date().toISOString() });
  });

  // Upload and analyze document via file
  app.post("/api/documents/upload", upload.single('document'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const { documentType, summaryLength } = req.body;
      const language = req.headers['accept-language'] || 'en';
      
      // Parse the uploaded document
      const parsedDoc = await parseUploadedDocument(req.file);
      
      // Create document record
      const documentData = insertDocumentSchema.parse({
        userId: null, // Anonymous for now
        filename: req.file.originalname,
        content: parsedDoc.content,
        documentType: documentType || "auto-detect",
      });

      const document = await storage.createDocument(documentData);

      // Analyze document with Gemini
      const startTime = Date.now();
      const analysis = await analyzeDocument(parsedDoc.content, documentType, language);
      const processingTime = `${((Date.now() - startTime) / 1000).toFixed(1)} seconds`;

      // Create analysis record
      const analysisData = insertAnalysisSchema.parse({
        documentId: document.id,
        summary: analysis.summary.summary,
        riskLevel: analysis.riskLevel,
        keyTerms: analysis.summary.keyTerms,
        riskItems: analysis.riskItems,
        clauses: analysis.clauses,
        recommendations: analysis.recommendations,
        wordCount: analysis.wordCount,
        processingTime,
      });

      const savedAnalysis = await storage.createAnalysis(analysisData);

      res.json({
        document,
        analysis: {
          ...savedAnalysis,
          summary: analysis.summary,
          riskItems: analysis.riskItems,
          clauses: analysis.clauses,
          recommendations: analysis.recommendations,
        },
      });
    } catch (error) {
      console.error("Document upload error:", error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Failed to process document" 
      });
    }
  });

  // Analyze document via text input
  app.post("/api/documents/analyze-text", async (req, res) => {
    try {
      const { content, documentType, summaryLength, language } = req.body;
      const preferredLanguage = language || req.headers['accept-language'] || 'en';

      if (!content || typeof content !== 'string') {
        return res.status(400).json({ error: "Document content is required" });
      }

      // Parse text content
      const parsedDoc = parseTextContent(content);

      // Create document record
      const documentData = insertDocumentSchema.parse({
        userId: null, // Anonymous for now
        filename: null,
        content: parsedDoc.content,
        documentType: documentType || "auto-detect",
      });

      const document = await storage.createDocument(documentData);

      // Analyze document with Gemini
      const startTime = Date.now();
      const analysis = await analyzeDocument(parsedDoc.content, documentType, preferredLanguage);
      const processingTime = `${((Date.now() - startTime) / 1000).toFixed(1)} seconds`;

      // Create analysis record
      const analysisData = insertAnalysisSchema.parse({
        documentId: document.id,
        summary: analysis.summary.summary,
        riskLevel: analysis.riskLevel,
        keyTerms: analysis.summary.keyTerms,
        riskItems: analysis.riskItems,
        clauses: analysis.clauses,
        recommendations: analysis.recommendations,
        wordCount: analysis.wordCount,
        processingTime,
      });

      const savedAnalysis = await storage.createAnalysis(analysisData);

      res.json({
        document,
        analysis: {
          ...savedAnalysis,
          summary: analysis.summary,
          riskItems: analysis.riskItems,
          clauses: analysis.clauses,
          recommendations: analysis.recommendations,
        },
      });
    } catch (error) {
      console.error("Text analysis error:", error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Failed to analyze document" 
      });
    }
  });

  // Get analysis by ID
  app.get("/api/analysis/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const analysis = await storage.getAnalysis(id);

      if (!analysis) {
        return res.status(404).json({ error: "Analysis not found" });
      }

      res.json(analysis);
    } catch (error) {
      console.error("Get analysis error:", error);
      res.status(500).json({ error: "Failed to retrieve analysis" });
    }
  });

  // Ask question about document
  app.post("/api/analysis/:id/question", async (req, res) => {
    try {
      const { id } = req.params;
      const { question, language } = req.body;
      const preferredLanguage = language || req.headers['accept-language'] || 'en';

      if (!question || typeof question !== 'string') {
        return res.status(400).json({ error: "Question is required" });
      }

      const analysis = await storage.getAnalysis(id);
      if (!analysis) {
        return res.status(404).json({ error: "Analysis not found" });
      }

      const document = await storage.getDocument(analysis.documentId);
      if (!document) {
        return res.status(404).json({ error: "Document not found" });
      }

      // Get previous chat messages for context
      const previousMessages = await storage.getChatMessages(id);
      const context = previousMessages.map(msg => `Q: ${msg.question}\nA: ${msg.answer}`).join('\n\n');

      // Get answer from Gemini
      const answer = await answerQuestion(document.content, question, context, preferredLanguage);

      // Save the Q&A
      const messageData = insertChatMessageSchema.parse({
        analysisId: id,
        question,
        answer,
      });

      const savedMessage = await storage.createChatMessage(messageData);

      res.json(savedMessage);
    } catch (error) {
      console.error("Q&A error:", error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Failed to answer question" 
      });
    }
  });

  // Get chat messages for analysis
  app.get("/api/analysis/:id/messages", async (req, res) => {
    try {
      const { id } = req.params;
      const messages = await storage.getChatMessages(id);
      res.json(messages);
    } catch (error) {
      console.error("Get messages error:", error);
      res.status(500).json({ error: "Failed to retrieve messages" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
