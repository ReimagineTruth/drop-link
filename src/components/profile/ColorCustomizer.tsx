
import { useTranslation } from 'react-i18next';
import { Label } from '@/components/ui/label';

interface ColorCustomizerProps {
  primaryColor: string;
  secondaryColor: string;
  onPrimaryColorChange: (color: string) => void;
  onSecondaryColorChange: (color: string) => void;
}

const predefinedColors = [
  '#3B82F6', // Blue
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#8B5CF6', // Violet
  '#06B6D4', // Cyan
  '#84CC16', // Lime
  '#F97316', // Orange
  '#EC4899', // Pink
  '#6366F1'  // Indigo
];

const ColorCustomizer = ({ 
  primaryColor, 
  secondaryColor, 
  onPrimaryColorChange, 
  onSecondaryColorChange 
}: ColorCustomizerProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      {/* Primary Color */}
      <div className="space-y-2">
        <Label>Primary Color</Label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={primaryColor}
            onChange={(e) => onPrimaryColorChange(e.target.value)}
            className="w-12 h-12 rounded-lg border-2 border-gray-200 cursor-pointer"
          />
          <div className="flex gap-2">
            {predefinedColors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => onPrimaryColorChange(color)}
                className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                  primaryColor === color ? 'border-gray-800' : 'border-gray-200'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Color */}
      <div className="space-y-2">
        <Label>Secondary Color</Label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={secondaryColor}
            onChange={(e) => onSecondaryColorChange(e.target.value)}
            className="w-12 h-12 rounded-lg border-2 border-gray-200 cursor-pointer"
          />
          <div className="flex gap-2">
            {predefinedColors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => onSecondaryColorChange(color)}
                className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                  secondaryColor === color ? 'border-gray-800' : 'border-gray-200'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="p-4 rounded-lg border-2 border-gray-200">
        <Label className="text-sm text-gray-600 mb-2 block">Preview</Label>
        <div className="space-y-2">
          <div 
            className="h-8 rounded"
            style={{ backgroundColor: primaryColor }}
          />
          <div 
            className="h-6 rounded"
            style={{ backgroundColor: secondaryColor }}
          />
        </div>
      </div>
    </div>
  );
};

export default ColorCustomizer;
