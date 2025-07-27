"use client";

import { useState } from 'react';
import ImageUploader from '@/components/ImageUploader';
import StyleSelector from '@/components/StyleSelector';
import ImagePreview from '@/components/ImagePreview';

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [style, setStyle] = useState<string>('Ghibli');
  const [transformedImage, setTransformedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!image) return;
    setIsLoading(true);
    setTransformedImage(null);
    setError(null);
    try {
      const response = await fetch('/api/transform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image, style }),
      });
      const data = await response.json();
      if (response.ok) {
        setTransformedImage(data.transformedImage);
      } else {
        setError(data.error || 'An unknown error occurred.');
      }
    } catch (error) {
      setError('Error transforming image. Please try again later.');
    }
    setIsLoading(false);
  };

  const handleClear = () => {
    setImage(null);
    setTransformedImage(null);
    setError(null);
  };

  return (
    <main className="container mx-auto p-4">
      <header className="text-center py-8">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          AI Profile Picture Generator
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Upload your photo and watch it transform with AI
        </p>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col gap-6">
          <ImageUploader onImageUpload={setImage} />
          <StyleSelector selectedStyle={style} onStyleChange={setStyle} />
          <button
            onClick={handleGenerate}
            disabled={!image || isLoading}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generating...
              </div>
            ) : (
              'Generate'
            )}
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </div>
        <div>
          <ImagePreview
            image={image}
            transformedImage={transformedImage}
            onClear={handleClear}
          />
        </div>
      </div>
    </main>
  );
}
