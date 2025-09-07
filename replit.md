# Overview

This project is "nyayasetu.ai" - a legal document analysis platform that uses AI to simplify complex legal documents. The application allows users to upload legal documents (PDF, DOCX, TXT) or paste text directly, then provides plain-language summaries, identifies key clauses, highlights risks and unfair terms, and offers an interactive Q&A chat interface. The system is built as a full-stack web application with a React frontend and Express backend, designed to make legal documents more accessible to everyday users.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript and Vite for build tooling
- **UI Library**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing
- **File Uploads**: Native HTML5 file input with drag-and-drop support

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Development Setup**: Hot module replacement via Vite integration
- **File Processing**: Multer for handling file uploads with size and type restrictions
- **Document Parsing**: Custom parsing service for text extraction from various file formats
- **API Structure**: RESTful endpoints for document upload, analysis, and chat functionality

## Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema**: Structured tables for users, documents, analyses, and chat messages
- **Development Storage**: In-memory storage implementation for development/testing
- **Migration Management**: Drizzle Kit for database schema migrations

## AI Integration
- **AI Provider**: Google Generative AI (Gemini) for document analysis
- **Analysis Features**: 
  - Plain-language document summarization
  - Key clause identification and simplification
  - Risk assessment with traffic light system (red/yellow/green)
  - Unfair terms detection
  - Interactive Q&A chat interface
- **Processing Pipeline**: Multi-stage analysis including content extraction, risk evaluation, and recommendation generation

## Authentication and Session Management
- **Session Storage**: PostgreSQL-based session store using connect-pg-simple
- **User Management**: Basic user registration and authentication system
- **Anonymous Usage**: Support for anonymous document analysis

# External Dependencies

## Third-party Services
- **Google Generative AI**: Primary AI service for document analysis using Gemini models
- **Neon Database**: PostgreSQL hosting service for production database

## Key Libraries and APIs
- **Database**: Drizzle ORM with PostgreSQL adapter, Neon serverless driver
- **UI Components**: Comprehensive Radix UI component library (40+ components)
- **File Processing**: Multer for multipart form handling
- **Validation**: Zod for runtime type validation and schema parsing
- **Date Handling**: date-fns for date manipulation and formatting
- **Development Tools**: Replit-specific plugins for cartographer and error overlays

## Infrastructure
- **Build System**: Vite with React plugin and TypeScript support
- **Deployment**: Node.js production environment with ESM module format
- **Asset Management**: Vite-based asset pipeline with path aliases
- **Error Handling**: Runtime error modal integration for development