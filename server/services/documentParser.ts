import * as fs from "fs";
import * as path from "path";
import * as mammoth from "mammoth";

export interface ParsedDocument {
  content: string;
  wordCount: number;
  filename?: string;
}

export async function parseTextFile(filePath: string): Promise<ParsedDocument> {
  try {
    const content = await fs.promises.readFile(filePath, 'utf-8');
    const wordCount = content.trim().split(/\s+/).length;
    
    return {
      content: content.trim(),
      wordCount,
      filename: path.basename(filePath)
    };
  } catch (error) {
    throw new Error(`Failed to parse text file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function parseDocxFile(filePath: string): Promise<ParsedDocument> {
  try {
    const result = await mammoth.extractRawText({ path: filePath });
    const content = result.value.trim();
    
    if (!content) {
      throw new Error("No text content found in DOCX file.");
    }
    
    const wordCount = content.split(/\s+/).length;
    
    return {
      content,
      wordCount,
      filename: path.basename(filePath)
    };
  } catch (error) {
    throw new Error(`Failed to parse DOCX file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function parseUploadedDocument(file: Express.Multer.File): Promise<ParsedDocument> {
  const extension = path.extname(file.originalname).toLowerCase();
  
  try {
    switch (extension) {
      case '.txt':
        return await parseTextFile(file.path);
      case '.docx':
        return await parseDocxFile(file.path);
      case '.pdf':
        throw new Error("PDF parsing is temporarily disabled. Please convert your PDF to text and paste it directly, or use a DOCX/TXT file instead.");
      default:
        throw new Error(`Unsupported file type: ${extension}. Please use DOCX or TXT files, or paste your text directly.`);
    }
  } finally {
    // Clean up the uploaded file after processing
    try {
      await fs.promises.unlink(file.path);
    } catch (cleanupError) {
      console.warn('Failed to clean up uploaded file:', cleanupError);
    }
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