
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';

interface Theme {
  id: string;
  name: string;
  preview: string;
  gradient: string;
}

const themes: Theme[] = [
  {
    id: 'default',
    name: 'Default',
    preview: 'bg-white border-gray-200',
    gradient: 'from-blue-500 to-purple-600'
  },
  {
    id: 'dark',
    name: 'Dark',
    preview: 'bg-gray-900 border-gray-700',
    gradient: 'from-gray-800 to-gray-900'
  },
  {
    id: 'ocean',
    name: 'Ocean',
    preview: 'bg-blue-50 border-blue-200',
    gradient: 'from-blue-400 to-cyan-600'
  },
  {
    id: 'sunset',
    name: 'Sunset',
    preview: 'bg-orange-50 border-orange-200',
    gradient: 'from-orange-400 to-pink-600'
  },
  {
    id: 'forest',
    name: 'Forest',
    preview: 'bg-green-50 border-green-200',
    gradient: 'from-green-400 to-emerald-600'
  },
  {
    id: 'lavender',
    name: 'Lavender',
    preview: 'bg-purple-50 border-purple-200',
    gradient: 'from-purple-400 to-pink-600'
  }
];

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const ThemeSelector = ({ currentTheme, onThemeChange }: ThemeSelectorProps) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {themes.map((theme) => (
        <Card
          key={theme.id}
          className={`cursor-pointer transition-all hover:scale-105 ${
            currentTheme === theme.id 
              ? 'ring-2 ring-primary ring-offset-2' 
              : 'hover:shadow-md'
          }`}
          onClick={() => onThemeChange(theme.id)}
        >
          <div className="p-3 space-y-2">
            <div className={`h-12 rounded ${theme.preview} relative overflow-hidden`}>
              <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} opacity-20`} />
              <div className="absolute bottom-1 left-1 right-1 bg-white/80 rounded h-2" />
              <div className="absolute bottom-2 left-2 w-4 h-1 bg-gray-400 rounded" />
            </div>
            <p className="text-sm font-medium text-center">{theme.name}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ThemeSelector;
