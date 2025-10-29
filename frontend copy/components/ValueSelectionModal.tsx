import {useState, useRef} from 'react';
import {Field} from '@airtable/blocks/interface/models';
import {ColorPicker} from './ColorPicker';
import type {ValueColor} from '../hooks/useFilters';

interface ValueSelectionModalProps {
    isOpen: boolean;
    field: Field | null;
    searchQuery: string;
    selectedValues: string[];
    uniqueValues: string[];
    valueColors: ValueColor;
    filterId: string;
    operator: 'is' | 'isNot' | 'isEmpty' | 'isNotEmpty';
    canCustomizeColors: boolean;
    onClose: () => void;
    onSearchChange: (query: string) => void;
    onToggleValue: (value: string) => void;
    onClearSelection: () => void;
    onSetValueColor: (filterId: string, value: string, colorId: string) => void;
    onSetOperator: (operator: 'is' | 'isNot' | 'isEmpty' | 'isNotEmpty') => void;
}

export function ValueSelectionModal({
    isOpen,
    field,
    searchQuery,
    selectedValues,
    uniqueValues,
    valueColors,
    filterId,
    operator,
    canCustomizeColors,
    onClose,
    onSearchChange,
    onToggleValue,
    onClearSelection,
    onSetValueColor,
    onSetOperator
}: ValueSelectionModalProps) {
    const [colorPickerOpen, setColorPickerOpen] = useState(false);
    const [colorPickerValue, setColorPickerValue] = useState<string | null>(null);
    const [colorPickerPosition, setColorPickerPosition] = useState({top: 0, left: 0});
    const colorButtonRefs = useRef<{[key: string]: HTMLButtonElement | null}>({});

    if (!isOpen || !field) return null;

    const filteredValues = uniqueValues.filter(value => 
        value.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleColorIconClick = (value: string, event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation(); // Empêcher le toggle de la checkbox
        const button = colorButtonRefs.current[value];
        if (button) {
            const rect = button.getBoundingClientRect();
            setColorPickerPosition({
                top: rect.top + rect.height + 5,
                left: rect.left
            });
        }
        setColorPickerValue(value);
        setColorPickerOpen(true);
    };

    const getValueColor = (value: string) => {
        const colorId = valueColors[value] || 'gray';
        const colorMap: {[key: string]: string} = {
            'blue': 'bg-blue-blue',
            'cyan': 'bg-cyan-cyan',
            'teal': 'bg-teal-teal',
            'green': 'bg-green-green',
            'yellow': 'bg-yellow-yellow',
            'orange': 'bg-orange-orange',
            'red': 'bg-red-red',
            'pink': 'bg-pink-pink',
            'purple': 'bg-purple-purple',
            'gray': 'bg-gray-gray500'
        };
        return colorMap[colorId] || 'bg-gray-gray500';
    };

    return (
        <>
            {/* Overlay pour fermer le modal */}
            <div 
                className="fixed inset-0 z-20 bg-black bg-opacity-25"
                onClick={onClose}
            ></div>
            
            {/* Modal */}
            <div className="absolute top-16 left-4 z-30 bg-white rounded-lg shadow-lg border border-gray-gray200 min-w-80 max-w-96 max-h-96 overflow-hidden">
                {/* En-tête du filtre */}
                <div className="p-3 border-b border-gray-gray200">
                    <div className="flex items-center justify-between">
                        <span className="text-base font-medium text-gray-gray800">
                            {field.name} {operator === 'is' ? 'est' : operator === 'isNot' ? "n'est pas" : operator === 'isEmpty' ? 'est vide' : "n'est pas vide"}
                        </span>
                        <button
                            onClick={onClose}
                            className="text-gray-gray400 hover:text-gray-gray600"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                
                {/* Barre de recherche - Masquée pour les opérateurs de vide */}
                {(operator === 'is' || operator === 'isNot') && (
                    <div className="p-3">
                        <input
                            type="text"
                            placeholder="Rechercher une option"
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full px-3 py-2 text-base border border-gray-gray200 rounded-sm bg-gray-gray25 text-gray-gray800 placeholder-gray-gray400 focus:outline-none focus:ring-2 focus:ring-blue-blue focus:border-blue-blue"
                        />
                    </div>
                )}
                
                {/* Message pour les opérateurs de vide */}
                {(operator === 'isEmpty' || operator === 'isNotEmpty') && (
                    <div className="p-3">
                        <div className="text-sm text-gray-gray500 bg-gray-gray25 rounded-sm p-3">
                            {operator === 'isEmpty' 
                                ? 'Ce filtre affichera tous les enregistrements où ce champ est vide.'
                                : 'Ce filtre affichera tous les enregistrements où ce champ n&apos;est pas vide.'
                            }
                        </div>
                    </div>
                )}
                
                {/* Liste des valeurs - Masquée pour les opérateurs de vide */}
                {(operator === 'is' || operator === 'isNot') && (
                    <div className="max-h-48 overflow-y-auto">
                    {filteredValues.map(value => {
                        const valueColorClass = getValueColor(value);
                        return (
                            <div
                                key={value}
                                className="flex items-center hover:bg-gray-gray25 transition-colors group"
                            >
                                <button
                                    onClick={() => onToggleValue(value)}
                                    className="flex-1 flex items-center px-3 py-2 text-left"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedValues.includes(value)}
                                        onChange={() => {}} // Handled by button onClick
                                        className="w-4 h-4 text-blue-blue bg-white border-gray-gray300 rounded-sm focus:ring-blue-blue focus:ring-2 pointer-events-none"
                                    />
                                    <span className="ml-3 text-base font-medium text-gray-gray800">
                                        {value}
                                    </span>
                                </button>
                                
                                {/* Icône de couleur - Visible seulement si personnalisation autorisée */}
                                {canCustomizeColors && (
                                    <button
                                        ref={el => {
                                            colorButtonRefs.current[value] = el;
                                        }}
                                        onClick={(e) => handleColorIconClick(value, e)}
                                        className="px-2 py-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="Changer la couleur"
                                    >
                                        <div className={`w-6 h-6 rounded-full ${valueColorClass} border-2 border-white shadow-sm hover:scale-110 transition-transform`} />
                                    </button>
                                )}
                            </div>
                        );
                    })}
                    {filteredValues.length === 0 && (
                        <div className="px-3 py-4 text-center text-sm text-gray-gray500">
                            Aucune valeur trouvée
                        </div>
                    )}
                </div>
                )}
                
                {/* Pied de page avec sélection d'opérateur - Style Airtable */}
                <div className="p-3 border-t border-gray-gray200 bg-gray-gray25">
                    {/* Sélection d'opérateur et bouton Effacer sur la même ligne */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-gray700">{field.name}</span>
                            <select
                                value={operator}
                                onChange={(e) => {
                                    const newOperator = e.target.value as 'is' | 'isNot' | 'isEmpty' | 'isNotEmpty';
                                    onSetOperator(newOperator);
                                }}
                                className="text-sm text-gray-gray600 bg-transparent border-none focus:outline-none"
                            >
                                <option value="is">est</option>
                                <option value="isNot">n&apos;est pas</option>
                                <option value="isEmpty">est vide</option>
                                <option value="isNotEmpty">n&apos;est pas vide</option>
                            </select>
                        </div>
                        <button
                            onClick={onClearSelection}
                            className="text-sm text-gray-gray500 hover:text-gray-gray700"
                        >
                            Effacer
                        </button>
                    </div>
                </div>
            </div>

            {/* Color Picker */}
            {colorPickerValue && (
                <ColorPicker
                    isOpen={colorPickerOpen}
                    selectedColorId={valueColors[colorPickerValue] || 'gray'}
                    onSelectColor={(colorId) => {
                        onSetValueColor(filterId, colorPickerValue, colorId);
                        setColorPickerOpen(false);
                    }}
                    onClose={() => setColorPickerOpen(false)}
                    position={colorPickerPosition}
                />
            )}
        </>
    );
}
