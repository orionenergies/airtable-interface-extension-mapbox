interface OperatorSelectorProps {
    currentOperator: 'is' | 'isNot' | 'isEmpty' | 'isNotEmpty';
    onOperatorChange: (operator: 'is' | 'isNot' | 'isEmpty' | 'isNotEmpty') => void;
    isOpen: boolean;
    onToggle: () => void;
}

const OPERATORS = [
    { value: 'is', label: 'est', icon: '=' },
    { value: 'isNot', label: "n'est pas", icon: '≠' },
    { value: 'isEmpty', label: 'est vide', icon: '○' },
    { value: 'isNotEmpty', label: "n'est pas vide", icon: '●' }
] as const;

export function OperatorSelector({ currentOperator, onOperatorChange, isOpen, onToggle }: OperatorSelectorProps) {
    const currentOperatorLabel = OPERATORS.find(op => op.value === currentOperator)?.label || 'est';

    return (
        <div className="relative">
            {/* Bouton d'ouverture */}
            <button
                onClick={onToggle}
                className="px-3 py-2 text-sm font-medium text-gray-gray700 bg-white border border-gray-gray200 rounded-sm hover:bg-gray-gray25 focus:outline-none focus:ring-2 focus:ring-blue-blue focus:ring-offset-1"
            >
                {currentOperatorLabel}
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-gray200 rounded-lg shadow-lg z-50">
                    <div className="py-1">
                        {OPERATORS.map((operator) => (
                            <button
                                key={operator.value}
                                onClick={() => {
                                    onOperatorChange(operator.value);
                                    onToggle();
                                }}
                                className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-gray25 flex items-center space-x-2 ${
                                    currentOperator === operator.value 
                                        ? 'bg-blue-blue text-white' 
                                        : 'text-gray-gray700'
                                }`}
                            >
                                <span className="w-4 text-center">{operator.icon}</span>
                                <span>{operator.label}</span>
                                {currentOperator === operator.value && (
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
