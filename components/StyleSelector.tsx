"use client";

interface StyleSelectorProps {
  selectedStyle: string;
  onStyleChange: (style: string) => void;
}

export default function StyleSelector({ selectedStyle, onStyleChange }: StyleSelectorProps) {
  const styles = [
    {
      id: 'Ghibli',
      name: 'Studio Ghibli',
      description: 'Magical anime-inspired artwork',
      icon: '🎨',
      gradient: 'from-green-400 to-blue-500'
    },
    {
      id: 'Mosaic',
      name: 'Mosaic Art',
      description: 'Classical tile-based patterns',
      icon: '🧩',
      gradient: 'from-purple-400 to-pink-500'
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
