import { Palette, Check } from 'lucide-react';
import { useState } from 'react';
import { themes } from '../themes';

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (themeId: string) => void;
}

export default function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const themeColors: Record<string, string> = {
    light: 'bg-gradient-to-r from-blue-400 to-indigo-400',
    dark: 'bg-gradient-to-r from-gray-700 to-gray-900',
    cyan: 'bg-gradient-to-r from-cyan-400 to-teal-400',
    purple: 'bg-gradient-to-r from-purple-400 to-pink-400',
    ocean: 'bg-gradient-to-r from-blue-700 to-cyan-700',
    forest: 'bg-gradient-to-r from-green-500 to-emerald-500',
    sunset: 'bg-gradient-to-r from-orange-400 to-red-400',
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 ${themes[currentTheme].colors.primary} text-white px-4 py-2 rounded-lg ${themes[currentTheme].colors.primaryHover} font-medium shadow-lg transition-all`}
      >
        <Palette className="w-5 h-5" />
        <span className="hidden md:inline">Tema</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className={`absolute right-0 mt-2 w-64 ${themes[currentTheme].colors.cardBg} rounded-lg shadow-xl border ${themes[currentTheme].colors.border} z-50 overflow-hidden`}>
            <div className={`p-3 border-b ${themes[currentTheme].colors.border}`}>
              <h3 className={`font-semibold ${themes[currentTheme].colors.text}`}>
                Izaberi Temu
              </h3>
            </div>
            <div className="p-2 max-h-96 overflow-y-auto">
              {Object.values(themes).map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    onThemeChange(theme.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                    currentTheme === theme.id
                      ? `${theme.colors.primary} text-white`
                      : `hover:bg-gray-100 ${themes[currentTheme].id === 'dark' || themes[currentTheme].id === 'ocean' ? 'hover:bg-gray-700' : ''}`
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full ${themeColors[theme.id]} flex-shrink-0`} />
                  <span className="flex-1 text-left font-medium">{theme.name}</span>
                  {currentTheme === theme.id && <Check className="w-5 h-5" />}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
