"use client";

import { useState } from 'react';

interface ImageUploaderProps {
  onImageUpload: (imageData: string) => void;
}

export default function ImageUploader({ onImageUpload }: ImageUploaderProps) {
  const [image, setImage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions (max 1024px on the longer side)
        const maxSize = 1024;
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to base64 with compression (0.8 quality for JPEG)
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        resolve(compressedDataUrl);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const compressedImage = await compressImage(file);
        setImage(compressedImage);
        onImageUpload(compressedImage);
      } catch (error) {
        console.error('Error compressing image:', error);
        // Fallback to original method
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageData = reader.result as string;
          setImage(imageData);
          onImageUpload(imageData);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      try {
        const compressedImage = await compressImage(file);
        setImage(compressedImage);
        onImageUpload(compressedImage);
      } catch (error) {
        console.error('Error compressing image:', error);
        // Fallback to original method
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageData = reader.result as string;
          setImage(imageData);
          onImageUpload(imageData);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">Upload Your Photo</h3>
      
      <label
        htmlFor="image-upload"
        className={`flex flex-col items-center justify-center w-full h-80 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${
          isDragOver
            ? 'border-purple-400 bg-purple-500/20'
            : 'border-white/30 bg-white/5 hover:bg-white/10 hover:border-white/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          <p className="mb-2 text-lg font-semibold text-white">
            <span className="font-bold">Click to upload</span> or drag and drop
          </p>
          <p className="text-sm text-gray-300">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
        <input
          id="image-upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>
      
      {image && (
        <div className="mt-6">
          <div className="relative group">
            <img 
              src={image} 
              alt="Uploaded preview" 
              className="w-full h-64 object-cover rounded-2xl shadow-2xl border border-white/20" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
              <span className="text-white font-medium">Image uploaded successfully!</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
