import {Field, FieldType} from '@airtable/blocks/interface/models';
import {
    CaretCircleDownIcon,
    TagIcon,
    MagnifyingGlassIcon,
    CheckSquareIcon,
    UserIcon,
    FunctionIcon,
} from '@phosphor-icons/react';

interface ColorFieldSelectionModalProps {
    isOpen: boolean;
    searchQuery: string;
    fields: Field[];
    onClose: () => void;
    onSearchChange: (query: string) => void;
    onFieldSelect: (field: Field) => void;
}

export function ColorFieldSelectionModal({
    isOpen,
    searchQuery,
    fields,
    onClose,
    onSearchChange,
    onFieldSelect,
}: ColorFieldSelectionModalProps) {
    if (!isOpen) return null;

    const getFieldIcon = (field: Field) => {
        switch (field.type) {
            case FieldType.SINGLE_SELECT:
                return <CaretCircleDownIcon size={16} className="text-gray-600 dark:text-gray-400" />;
            case FieldType.MULTIPLE_SELECTS:
                return <TagIcon size={16} className="text-gray-600 dark:text-gray-400" />;
            case FieldType.CHECKBOX:
                return <CheckSquareIcon size={16} className="text-gray-600 dark:text-gray-400" />;
            case FieldType.SINGLE_COLLABORATOR:
            case FieldType.CREATED_BY:
            case FieldType.LAST_MODIFIED_BY:
                return <UserIcon size={16} className="text-gray-600 dark:text-gray-400" />;
            case FieldType.FORMULA:
                return <FunctionIcon size={16} className="text-gray-600 dark:text-gray-400" />;
            default:
                return <TagIcon size={16} className="text-gray-600 dark:text-gray-400" />;
        }
    };

    const filteredFields = fields.filter((field) =>
        field.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 z-20 bg-black bg-opacity-25" onClick={onClose}></div>

            {/* Modal */}
            <div className="absolute top-16 left-4 z-30 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-80 max-h-96 overflow-hidden">
                {/* Barre de recherche */}
                <div className="p-3">
                    <div className="relative">
                        <MagnifyingGlassIcon
                            size={16}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                        />
                        <input
                            type="text"
                            placeholder="Rechercher un champ..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            autoFocus
                        />
                    </div>
                </div>

                {/* Liste des champs */}
                <div className="max-h-64 overflow-y-auto">
                    {filteredFields.map((field) => (
                        <button
                            key={field.id}
                            onClick={() => onFieldSelect(field)}
                            className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-3 text-sm font-medium text-gray-800 dark:text-gray-100 transition-colors"
                        >
                            {getFieldIcon(field)}
                            <span className="flex-1">{field.name}</span>
                        </button>
                    ))}
                    {filteredFields.length === 0 && (
                        <div className="px-3 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                            Aucun champ trouvé
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={onClose}
                        className="w-full px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
                    >
                        Annuler
                    </button>
                </div>
            </div>
        </>
    );
}

