import * as path from "path";
import * as mammoth from "mammoth";

// Set up comprehensive polyfills for Node.js environment
if (typeof global !== 'undefined') {
  // Mock DOMMatrix for Node.js
  if (!(global as any).DOMMatrix) {
    (global as any).DOMMatrix = class DOMMatrix {
      a: number; b: number; c: number; d: number; e: number; f: number;
      constructor() {
        this.a = 1; this.b = 0; this.c = 0; this.d = 1; this.e = 0; this.f = 0;
      }
    };
  }
  
  // Mock DOMPoint for Node.js
  if (!(global as any).DOMPoint) {
    (global as any).DOMPoint = class DOMPoint {
      x: number; y: number; z: number; w: number;
      constructor(x = 0, y = 0, z = 0, w = 1) {
        this.x = x; this.y = y; this.z = z; this.w = w;
      }
    };
  }
  
  // Mock other browser APIs that might be needed
  if (!(global as any).DOMRect) {
    (global as any).DOMRect = class DOMRect {
      x: number; y: number; width: number; height: number;
      constructor(x = 0, y = 0, width = 0, height = 0) {
        this.x = x; this.y = y; this.width = width; this.height = height;
      }
    };
  }
}

export interface ParsedDocument {
  content: string;
  wordCount: number;
  filename?: string;
}

export async function parseTextBuffer(buffer: Buffer, filename: string): Promise<ParsedDocument> {
  try {
    const content = buffer.toString('utf-8');
    const wordCount = content.trim().split(/\s+/).length;
    
    return {
      content: content.trim(),
      wordCount,
      filename
    };
  } catch (error) {
    throw new Error(`Failed to parse text file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function parseDocxBuffer(buffer: Buffer, filename: string): Promise<ParsedDocument> {
  try {
    const result = await mammoth.extractRawText({ buffer });
    const content = result.value.trim();
    
    if (!content) {
      throw new Error("No text content found in DOCX file.");
    }
    
    const wordCount = content.split(/\s+/).length;
    
    return {
      content,
      wordCount,
      filename
    };
  } catch (error) {
    throw new Error(`Failed to parse DOCX file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function parsePdfBuffer(buffer: Buffer, filename: string): Promise<ParsedDocument> {
  try {
    // Use pdfjs-dist for Node.js (polyfills are set up at module level)
    const pdfjsLib = await import("pdfjs-dist");
    
    // Configure pdfjs-dist for Node.js environment
    // Set workerSrc to empty string to disable worker
    pdfjsLib.GlobalWorkerOptions.workerSrc = '';
    
    // Convert Buffer to Uint8Array for pdfjs-dist
    const uint8Array = new Uint8Array(buffer);
    
    // Load the PDF document from buffer with Node.js-specific options
    const loadingTask = pdfjsLib.getDocument({
      data: uint8Array,
      verbosity: 0, // Reduce console output
      useWorkerFetch: false, // Disable worker fetch
      isEvalSupported: false, // Disable eval support
      useSystemFonts: false // Disable system fonts
    });
    
    const pdf = await loadingTask.promise;
    let fullText = '';
    
    // Extract text from all pages
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + ' ';
    }
    
    const content = fullText.trim();
    
    if (!content || content.length < 10) {
      throw new Error("No readable text content found in PDF file. The PDF might be image-based or corrupted.");
    }
    
    const wordCount = content.split(/\s+/).length;
    
    return {
      content,
      wordCount,
      filename
    };
    
  } catch (error) {
    console.error("PDF parsing error:", error);
    
    // Provide specific error messages based on error type
    if (error instanceof Error) {
      const errorMessage = error.message.toLowerCase();
      
      if (errorMessage.includes('dommatrix')) {
        throw new Error("PDF parsing is currently experiencing compatibility issues. Please convert your PDF to DOCX or TXT format, or copy and paste the text directly into the text input field.");
      }
      
      if (errorMessage.includes('worker') || errorMessage.includes('globalsource')) {
        throw new Error("PDF parsing is currently experiencing compatibility issues. Please convert your PDF to DOCX or TXT format, or copy and paste the text directly into the text input field.");
      }
      
      if (errorMessage.includes('invalid pdf') || errorMessage.includes('not a pdf')) {
        throw new Error("Invalid PDF file format. Please ensure the PDF is not password-protected and try again.");
      }
      
      if (errorMessage.includes('no readable text') || errorMessage.includes('no text')) {
        throw new Error("No readable text found in the PDF. This might be an image-based PDF. Please try converting to DOCX or TXT format.");
      }
      
      if (errorMessage.includes('timeout')) {
        throw new Error("PDF parsing timed out. The file might be too large or complex. Please try a smaller PDF or convert to DOCX/TXT format.");
      }
      
      if (errorMessage.includes('cannot read properties') || errorMessage.includes('undefined')) {
        throw new Error("The PDF file appears to be corrupted or in an unsupported format. Please try converting to DOCX or TXT format.");
      }
    }
    
    // Generic fallback error message
    throw new Error("PDF parsing failed. Please try converting your PDF to DOCX or TXT format, or copy and paste the text directly into the text input field.");
  }
}

export async function parseUploadedDocument(file: Express.Multer.File): Promise<ParsedDocument> {
  const extension = path.extname(file.originalname).toLowerCase();
  
  try {
    switch (extension) {
      case '.txt':
        return await parseTextBuffer(file.buffer, file.originalname);
      case '.docx':
        return await parseDocxBuffer(file.buffer, file.originalname);
      case '.pdf':
        return await parsePdfBuffer(file.buffer, file.originalname);
      default:
        throw new Error(`Unsupported file type: ${extension}. Please use PDF, DOCX, or TXT files, or paste your text directly.`);
    }
  } catch (error) {
    throw error;
  }
}

export function parseTextContent(text: string): ParsedDocument {
  const content = text.trim();
  const wordCount = content.split(/\s+/).length;
  
  if (!content) {
    throw new Error("Document content is empty");
  }
  
  if (wordCount < 10) {
    throw new Error("Document is too short for meaningful analysis");
  }
  
  return {
    content,
    wordCount
  };
}