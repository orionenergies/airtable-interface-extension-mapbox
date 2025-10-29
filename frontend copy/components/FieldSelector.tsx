import {Field} from '@airtable/blocks/interface/models';

interface FieldSelectorProps {
    currentField: Field;
    availableFields: Field[];
    onFieldChange: (field: Field) => void;
    isOpen: boolean;
    onToggle: () => void;
}

export function FieldSelector({ currentField, availableFields, onFieldChange, isOpen, onToggle }: FieldSelectorProps) {
    return (
        <div className="relative">
            {/* Bouton d'ouverture */}
            <button
                onClick={onToggle}
                className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-gray-gray700 bg-white border border-gray-gray200 rounded-sm hover:bg-gray-gray25 focus:outline-none focus:ring-2 focus:ring-blue-blue focus:ring-offset-1"
            >
                <span>{currentField.name}</span>
                <svg className="w-3 h-3 text-gray-gray500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-gray200 rounded-lg shadow-lg z-50">
                    <div className="py-1">
                        {availableFields.map((field) => (
                            <button
                                key={field.id}
                                onClick={() => {
                                    onFieldChange(field);
                                    onToggle();
                                }}
                                className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-gray25 flex items-center space-x-2 ${
                                    currentField.id === field.id 
                                        ? 'bg-blue-blue text-white' 
                                        : 'text-gray-gray700'
                                }`}
                            >
                                <span className="flex-1">{field.name}</span>
                                {currentField.id === field.id && (
                                    <span className="ml-auto">✓</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
