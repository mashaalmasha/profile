"use client";

interface StyleSelectorProps {
  selectedStyle: string;
  onStyleChange: (style: string) => void;
}

export default function StyleSelector({ selectedStyle, onStyleChange }: StyleSelectorProps) {
  const styles = [
    {
      id: 'studio-ghibli',
      name: 'Studio Ghibli',
      description: 'Magical anime-inspired artwork',
      icon: '🎨',
      gradient: 'from-green-400 to-blue-500'
    },
    {
      id: 'van-gogh',
      name: 'Van Gogh Starry Night',
      description: 'Swirling impressionist masterpiece',
      icon: '🌌',
      gradient: 'from-blue-600 to-yellow-400'
    },
    {
      id: 'professional',
      name: 'Professional Photo',
      description: 'Enhanced portrait photography',
      icon: '📸',
      gradient: 'from-gray-600 to-gray-400'
    },
    {
      id: 'cartoon',
      name: 'Cartoonify',
      description: 'Fun animated cartoon style',
      icon: '🎭',
      gradient: 'from-orange-400 to-red-500'
    },
    {
      id: 'plushie',
      name: 'Plushie',
      description: 'Cute stuffed toy appearance',
      icon: '🧸',
      gradient: 'from-pink-400 to-purple-500'
    },
    {
      id: 'old-version',
      name: 'Old Version',
      description: 'Age progression transformation',
      icon: '👴',
      gradient: 'from-amber-600 to-orange-500'
    },
    {
      id: 'baby-version',
      name: 'Baby Version',
      description: 'Youthful baby-like features',
      icon: '👶',
      gradient: 'from-cyan-400 to-blue-400'
    },
    {
      id: 'realism',
      name: 'Realism',
      description: 'Photorealistic enhancement',
      icon: '🖼️',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      id: 'pixel-studio',
      name: 'Pixel Studio',
      description: 'Retro pixelated art style',
      icon: '🎮',
      gradient: 'from-purple-600 to-indigo-500'
    },
    {
      id: '3d-animated',
      name: '3D Animated Style',
      description: 'Modern 3D animation look',
      icon: '🎬',
      gradient: 'from-violet-500 to-purple-600'
    }
  ];

  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">Choose Your Style</h3>
      
      <div className="grid grid-cols-1 gap-4">
        {styles.map((style) => (
          <div
            key={style.id}
            className={`relative cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
              selectedStyle === style.id
                ? 'ring-2 ring-purple-400 ring-opacity-50'
                : 'hover:bg-white/5'
            }`}
            onClick={() => onStyleChange(style.id)}
          >
            <div className={`bg-gradient-to-r ${style.gradient} p-1 rounded-2xl`}>
              <div className="bg-slate-900/90 backdrop-blur-xl rounded-xl p-6 border border-white/10">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{style.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-white mb-1">{style.name}</h4>
                    <p className="text-gray-300 text-sm">{style.description}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedStyle === style.id
                      ? 'border-purple-400 bg-purple-400'
                      : 'border-white/30'
                  }`}>
                    {selectedStyle === style.id && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
        <p className="text-sm text-gray-300 text-center">
          💡 <span className="font-medium">Pro tip:</span> Each style creates unique artistic interpretations of your photo
        </p>
      </div>
    </div>
  );
}
