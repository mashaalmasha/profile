"use client";

interface ImagePreviewProps {
  image: string | null;
  transformedImage: string | null;
  onClear: () => void;
}

export default function ImagePreview({ image, transformedImage, onClear }: ImagePreviewProps) {
  const handleDownload = () => {
    if (transformedImage) {
      const a = document.createElement('a');
      a.href = transformedImage;
      a.download = 'ai-artwork.png';
      a.click();
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white">Preview Gallery</h2>
        {(image || transformedImage) && (
          <button 
            onClick={onClear} 
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-lg border border-red-500/30 transition-all duration-300 hover:scale-105"
          >
            Clear All
          </button>
        )}
      </div>
      
      <div className="space-y-8">
        {/* Original Image */}
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">Original Photo</h3>
          </div>
          
          <div className="w-full h-80 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center border border-white/10 overflow-hidden">
            {image ? (
              <img 
                src={image} 
                alt="Original" 
                className="w-full h-full object-cover rounded-xl" 
              />
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-gray-400 font-medium">No image uploaded yet</p>
                <p className="text-gray-500 text-sm mt-1">Upload a photo to get started</p>
              </div>
            )}
          </div>
        </div>

        {/* Transformed Image */}
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">AI Generated Artwork</h3>
          </div>
          
          <div className="w-full h-80 bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl flex items-center justify-center border border-purple-500/20 overflow-hidden">
            {transformedImage ? (
              <div className="relative w-full h-full group">
                <img
                  src={transformedImage}
                  alt="Transformed"
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end justify-center pb-6">
                  <button
                    onClick={handleDownload}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Download Artwork</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <p className="text-gray-400 font-medium">Ready for transformation</p>
                <p className="text-gray-500 text-sm mt-1">Click "Generate" to create your artwork</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
