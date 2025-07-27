# AI Profile Picture Generator - Project Plan

This document outlines the plan for creating a web application that allows users to upload a profile picture and apply different visual styles to it using AI.

## Phase 1: Project Setup & Basic UI

This phase focuses on setting up the project structure and creating the basic user interface.

*   **Task 1: Initialize Next.js Project.**
    *   Use `npx create-next-app@latest` to create a new Next.js project.
    *   Choose TypeScript for the project.
    *   Choose to use the App Router.
*   **Task 2: Create Project Structure.**
    *   Create a `components` directory for reusable UI components.
    *   Create a `public` directory for static assets.
    *   Create a `styles` directory for global CSS.
*   **Task 3: Build the Main UI.**
    *   Create a main page (`app/page.tsx`) that will contain the application.
    *   Add a title and a brief description of the app.
    *   Create a `components/ImageUploader.tsx` component for the file input.
    *   Create a `components/StyleSelector.tsx` component for the style selection (radio buttons).
    *   Create a `components/ImagePreview.tsx` component to display the original and transformed images.
*   **Task 4: Style the UI.**
    *   Use a CSS framework like Tailwind CSS for styling.
    *   Create a basic layout with the uploader on the left and the preview on the right.
    *   Style the file input, radio buttons, and buttons.

## Phase 2: Image Upload and Preview

This phase implements the functionality for users to upload an image and see a preview.

*   **Task 1: Handle File Input.**
    *   In `components/ImageUploader.tsx`, create a file input element.
    *   Add an `onChange` handler to capture the selected file.
*   **Task 2: Read and Display Image Preview.**
    *   When a file is selected, use the `FileReader` API to read the image data as a data URL.
    *   Store the data URL in the component's state.
    *   Pass the data URL to the `components/ImagePreview.tsx` component.
    *   The `ImagePreview` component will display the image using an `<img>` tag.

## Phase 3: API Route for Image Processing

This phase creates the backend API endpoint that will handle the image transformation logic.

*   **Task 1: Create API Route.**
    *   Create a new API route file at `app/api/transform/route.ts`.
    *   This route will accept a POST request with the image data and the selected style.
*   **Task 2: Handle Image Data.**
    *   The API route will receive the image as a base64 encoded string.
    *   It will also receive the selected style (e.g., "Ghibli", "Mosaic").

## Phase 4: Gemini API Integration

This phase integrates the Gemini API to perform the image style transfer.

*   **Task 1: Set up Gemini API Client.**
    *   Install the `@google/generative-ai` package.
    *   Create a Gemini API client instance in the API route.
    *   Use an environment variable to store the Gemini API key.
*   **Task 2: Prepare Prompt for Gemini.**
    *   The API route will construct a prompt for the Gemini API. The prompt will include the user's selected style and the image data.
*   **Task 3: Call Gemini API.**
    *   Call the `generateContent` method of the Gemini API with the prepared prompt.
    *   The model will return the transformed image data.
*   **Task 4: Handle Gemini API Response.**
    *   The API route will receive the transformed image data from the Gemini API.
    *   It will then send this data back to the frontend as the response to the POST request.

## Phase 5: Displaying the Result & Download

This phase displays the transformed image to the user and allows them to download it.

*   **Task 1: Update Frontend State.**
    *   The frontend will receive the transformed image data from the API route.
    *   It will store this data in the component's state.
*   **Task 2: Display Transformed Image.**
    *   The `ImagePreview` component will be updated to display the new transformed image alongside the original image.
*   **Task 3: Implement Download Functionality.**
    *   Add a "Download" button to the UI.
    *   When clicked, create a temporary `<a>` element with the transformed image data as the `href` and a `download` attribute.
    *   Programmatically click the link to trigger the download.

## Phase 6: Polishing and Refinements

This phase focuses on improving the user experience and handling edge cases.

*   **Task 1: Add Loading States.**
    *   Show a loading indicator while the Gemini API is processing the image.
    *   Disable the "Generate" button during processing.
*   **Task 2: Handle Errors.**
    *   Implement error handling for API calls.
    *   Display user-friendly error messages if the image transformation fails.
*   **Task 3: Improve UI/UX.**
    *   Add transitions and animations to make the UI more engaging.
    *   Ensure the layout is responsive and works well on different screen sizes.
*   **Task 4: Add a "Clear" Button.**
    *   Add a button to clear the uploaded image and reset the state of the application.
