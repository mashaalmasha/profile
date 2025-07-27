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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <main className="relative container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center py-12">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 shadow-2xl">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6">
            AI Profile Picture
            <span className="block text-4xl md:text-5xl mt-2">Generator</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Transform your photos into stunning AI-generated artwork with just a few clicks. 
            Choose from multiple artistic styles and watch the magic happen.
          </p>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12 max-w-7xl mx-auto">
          {/* Left Column - Controls */}
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
              <ImageUploader onImageUpload={setImage} />
            </div>
            
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
              <StyleSelector selectedStyle={style} onStyleChange={setStyle} />
            </div>
            
            <button
              onClick={handleGenerate}
              disabled={!image || isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-4 px-8 rounded-xl shadow-2xl hover:shadow-purple-500/25 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  <span className="text-lg">Generating your masterpiece...</span>
                </div>
              ) : (
                <span className="text-lg">✨ Generate AI Artwork</span>
              )}
            </button>
            
            {error && (
              <div className="bg-red-500/20 backdrop-blur-xl rounded-xl p-4 border border-red-500/30">
                <p className="text-red-200 text-center font-medium">{error}</p>
              </div>
            )}
          </div>

          {/* Right Column - Preview */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
            <ImagePreview
              image={image}
              transformedImage={transformedImage}
              onClear={handleClear}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-12 mt-16">
          <p className="text-gray-400 text-sm">
            Powered by advanced AI technology • Transform your photos into art
          </p>
        </footer>
      </main>
    </div>
  );
}
