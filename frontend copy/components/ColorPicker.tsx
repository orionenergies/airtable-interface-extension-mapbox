interface ColorPickerProps {
    isOpen: boolean;
    selectedColorId: string;
    onSelectColor: (colorId: string) => void;
    onClose: () => void;
    position: {top: number; left: number};
}

const AIRTABLE_COLORS = [
    {id: 'blue', name: 'Bleu', bg: 'bg-blue-blue'},
    {id: 'cyan', name: 'Cyan', bg: 'bg-cyan-cyan'},
    {id: 'teal', name: 'Sarcelle', bg: 'bg-teal-teal'},
    {id: 'green', name: 'Vert', bg: 'bg-green-green'},
    {id: 'yellow', name: 'Jaune', bg: 'bg-yellow-yellow'},
    {id: 'orange', name: 'Orange', bg: 'bg-orange-orange'},
    {id: 'red', name: 'Rouge', bg: 'bg-red-red'},
    {id: 'pink', name: 'Rose', bg: 'bg-pink-pink'},
    {id: 'purple', name: 'Violet', bg: 'bg-purple-purple'},
    {id: 'gray', name: 'Gris', bg: 'bg-gray-gray500'}
];

export function ColorPicker({isOpen, selectedColorId, onSelectColor, onClose, position}: ColorPickerProps) {
    if (!isOpen) return null;

    return (
        <>
            {/* Overlay pour fermer le picker */}
            <div 
                className="fixed inset-0 z-40"
                onClick={onClose}
            />
            
            {/* Panel de sélection de couleurs */}
            <div 
                className="absolute z-50 bg-white rounded-lg shadow-xl border border-gray-gray200 p-3"
                style={{
                    top: `${position.top}px`,
                    left: `${position.left}px`,
                }}
            >
                <div className="grid grid-cols-4 gap-2">
                    {AIRTABLE_COLORS.map((color) => (
                        <button
                            key={color.id}
                            onClick={() => {
                                onSelectColor(color.id);
                                onClose();
                            }}
                            className={`
                                w-8 h-8 rounded-full ${color.bg}
                                flex items-center justify-center
                                hover:scale-110 transition-transform
                                ${selectedColorId === color.id ? 'ring-2 ring-offset-2 ring-blue-blue' : ''}
                            `}
                            title={color.name}
                        >
                            {selectedColorId === color.id && (
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}
