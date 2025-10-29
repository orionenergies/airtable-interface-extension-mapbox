import {useState} from 'react';
import {Field} from '@airtable/blocks/interface/models';
import {colorUtils} from '@airtable/blocks/interface/ui';
import {ColorPicker} from './ColorPicker';
import {type AirtableColor, DEFAULT_MARKER_COLOR} from '../constants';

interface ColorValuesModalProps {
    isOpen: boolean;
    field: Field | null;
    searchQuery: string;
    uniqueValues: string[];
    colorConfiguration: Map<string, AirtableColor>;
    onClose: () => void;
    onSearchChange: (query: string) => void;
    onColorChange: (value: string, color: AirtableColor) => void;
    onAutoAssignColors: () => void;
    onRemoveField: () => void;
}

export function ColorValuesModal({
    isOpen,
    field,
    searchQuery,
    uniqueValues,
    colorConfiguration,
    onClose,
    onSearchChange,
    onColorChange,
    onAutoAssignColors,
    onRemoveField,
}: ColorValuesModalProps) {
    const [colorPickerOpen, setColorPickerOpen] = useState(false);
    const [colorPickerValue, setColorPickerValue] = useState<string | null>(null);

    if (!isOpen || !field) return null;

    const filteredValues = uniqueValues.filter((value) =>
        value.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const handleColorIconClick = (value: string, event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setColorPickerValue(value);
        setColorPickerOpen(true);
    };

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 z-20 bg-black bg-opacity-25" onClick={onClose}></div>

            {/* Modal */}
            <div className="absolute top-16 left-4 z-30 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 min-w-80 max-w-96 max-h-[500px] overflow-hidden">
                {/* En-tête */}
                <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                            Personnaliser les couleurs - {field.name}
                        </span>
                        <button
                            onClick={onClose}
                            className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Barre de recherche et bouton Auto */}
                <div className="p-3 space-y-2">
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Rechercher une valeur..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="flex-1 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                            onClick={onAutoAssignColors}
                            className="px-3 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors whitespace-nowrap"
                            title="Assigner automatiquement des couleurs"
                        >
                            Auto
                        </button>
                    </div>
                </div>

                {/* Liste des valeurs */}
                <div className="max-h-64 overflow-y-auto">
                    {filteredValues.map((value) => {
                        const color = colorConfiguration.get(value) || DEFAULT_MARKER_COLOR;
                        const hexColor = colorUtils.getHexForColor(color);

                        return (
                            <div
                                key={value}
                                className="flex items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors px-3 py-2"
                            >
                                <button
                                    onClick={(e) => handleColorIconClick(value, e)}
                                    className="mr-3 flex-shrink-0"
                                    title="Changer la couleur"
                                >
                                    <div
                                        className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-600 shadow-sm hover:scale-110 transition-transform"
                                        style={{backgroundColor: hexColor}}
                                    />
                                </button>
                                <span className="flex-1 text-sm font-medium text-gray-800 dark:text-gray-100">
                                    {value}
                                </span>
                            </div>
                        );
                    })}
                    {filteredValues.length === 0 && (
                        <div className="px-3 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                            Aucune valeur trouvée
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                            {uniqueValues.length} valeur{uniqueValues.length > 1 ? 's' : ''}
                        </span>
                        <button
                            onClick={onRemoveField}
                            className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium transition-colors"
                        >
                            Supprimer ce champ
                        </button>
                    </div>
                </div>
            </div>

            {/* Color Picker */}
            {colorPickerOpen && colorPickerValue && (
                <ColorPicker
                    selectedColor={colorConfiguration.get(colorPickerValue) || DEFAULT_MARKER_COLOR}
                    onColorChange={(newColor) => {
                        onColorChange(colorPickerValue, newColor);
                        setColorPickerOpen(false);
                        setColorPickerValue(null);
                    }}
                    onClose={() => {
                        setColorPickerOpen(false);
                        setColorPickerValue(null);
                    }}
                />
            )}
        </>
    );
}

