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
      a.download = 'transformed-image.png';
      a.click();
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Preview</h2>
        {(image || transformedImage) && (
          <button onClick={onClear} className="text-gray-500 hover:text-gray-700">
            Clear
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2">Original</h3>
          <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
            {image ? (
              <img src={image} alt="Original" className="rounded-lg max-h-full" />
            ) : (
              <span className="text-gray-500">No image uploaded</span>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2">Transformed</h3>
          <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
            {transformedImage ? (
              <img
                src={transformedImage}
                alt="Transformed"
                className="rounded-lg max-h-full"
              />
            ) : (
              <span className="text-gray-500">No transformed image</span>
            )}
          </div>
          {transformedImage && (
            <button
              onClick={handleDownload}
              className="bg-green-500 text-white px-4 py-2 rounded mt-4 w-full"
            >
              Download
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
