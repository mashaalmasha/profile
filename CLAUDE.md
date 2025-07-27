# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack (opens at http://localhost:3000)
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## Project Architecture

This is an AI Profile Picture Generator built with Next.js 15 and TypeScript. The application allows users to upload images and apply AI-powered style transformations using Google's Gemini API.

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **AI Integration**: Google Generative AI (@google/generative-ai)
- **Fonts**: Geist Sans and Geist Mono

### Project Structure
- `app/page.tsx` - Main application interface with image upload, style selection, and preview
- `app/layout.tsx` - Root layout with Geist fonts configuration
- `app/api/transform/route.ts` - API endpoint that handles Gemini API integration for image transformation
- `components/` - Reusable UI components:
  - `ImageUploader.tsx` - File upload with drag-and-drop support
  - `StyleSelector.tsx` - Radio button selector for transformation styles (Ghibli, Mosaic)
  - `ImagePreview.tsx` - Side-by-side display of original and transformed images with download functionality

### Key Features
- Image upload with FileReader API for base64 conversion
- Style selection with radio buttons for different AI transformation styles
- Real-time image preview with loading states
- Download functionality for transformed images
- Error handling for API failures
- Responsive design with Tailwind CSS grid layouts

### Environment Variables
- `FAL_KEY` - Required for Fal.ai image transformation
  - Get your API key from: https://fal.ai/dashboard
  - Add to `.env.local` file: `FAL_KEY=your_api_key_here`
  - Free tier: 100 requests/month
- `GEMINI_API_KEY` - (Legacy) Previously used for Google Generative AI
  - The `.env.local` file is already gitignored for security

### Code Patterns
- Uses "use client" directive for client-side components that handle user interactions
- TypeScript interfaces for component props and data types
- Error boundaries and loading states for async operations
- Base64 image handling for API communication
- Consistent component structure with props interfaces