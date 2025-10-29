import {colorUtils} from '@airtable/blocks/interface/ui';
import {AIRTABLE_COLORS, type AirtableColor} from '../constants';

interface ColorPickerProps {
    selectedColor: AirtableColor;
    onColorChange: (color: AirtableColor) => void;
    onClose: () => void;
}

export function ColorPicker({selectedColor, onColorChange, onClose}: ColorPickerProps) {
    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">
                    Choisir une couleur
                </h3>
                <div className="grid grid-cols-5 gap-2">
                    {AIRTABLE_COLORS.map((color) => {
                        const hexColor = colorUtils.getHexForColor(color);
                        const isSelected = color === selectedColor;

                        return (
                            <button
                                key={color}
                                onClick={() => onColorChange(color)}
                                className={`w-10 h-10 rounded-full transition-transform hover:scale-110 flex items-center justify-center ${
                                    isSelected ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                                }`}
                                style={{backgroundColor: hexColor}}
                                title={color}
                            >
                                {isSelected && (
                                    <svg
                                        className="w-5 h-5 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

