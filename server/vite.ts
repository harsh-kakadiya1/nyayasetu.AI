import express, { type Express } from "express";
import { type Server } from "http";

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  // In production, we don't need Vite setup - this is just for development
  // The frontend is deployed separately on Netlify
  if (process.env.NODE_ENV === 'production') {
    log('Running in production mode - skipping Vite setup');
    return;
  }
  
  log('Development mode - Vite setup would go here');
}

export function serveStatic(app: Express) {
  // In production, we don't serve static files from the API server
  // The frontend is deployed separately on Netlify
  if (process.env.NODE_ENV === 'production') {
    log('Production mode - static files served by Netlify');
    return;
  }
  
  log('Development mode - static file serving would go here');
}
