import * as fs from "fs";
import * as path from "path";

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

export async function parseUploadedDocument(file: Express.Multer.File): Promise<ParsedDocument> {
  const extension = path.extname(file.originalname).toLowerCase();
  
  switch (extension) {
    case '.txt':
      return parseTextFile(file.path);
    case '.pdf':
      // For now, we'll require manual text extraction
      // In a production app, you'd use a PDF parsing library like pdf-parse
      throw new Error("PDF parsing not implemented. Please copy and paste the text content.");
    case '.docx':
      // For now, we'll require manual text extraction  
      // In a production app, you'd use a DOCX parsing library like mammoth
      throw new Error("DOCX parsing not implemented. Please copy and paste the text content.");
    default:
      throw new Error(`Unsupported file type: ${extension}`);
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
