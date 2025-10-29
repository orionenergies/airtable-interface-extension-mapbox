import {Field, FieldType} from '@airtable/blocks/interface/models';
import {
    MagnifyingGlassIcon,
    ListMagnifyingGlassIcon,
    FunctionIcon,
    UserIcon,
    TextAUnderlineIcon,
    HashStraightIcon,
    PercentIcon,
    CurrencyDollarSimpleIcon,
    CalendarIcon,
    CalculatorIcon,
    ArticleNyTimesIcon,
    ClockIcon,
    StarIcon,
    BarcodeIcon,
    CheckSquareIcon,
    EnvelopeSimpleIcon,
    TextTIcon,
    TagIcon,
    PhoneIcon,
    LinkIcon,
    TrendUpIcon,
    HashIcon,
    PlayIcon,
    PaperclipIcon,
    UsersIcon,
    FileIcon,
    CaretCircleDownIcon
} from '@phosphor-icons/react';

interface FieldSelectionModalProps {
    isOpen: boolean;
    searchQuery: string;
    fields: Field[];
    onClose: () => void;
    onSearchChange: (query: string) => void;
    onFieldSelect: (field: Field) => void;
}

export function FieldSelectionModal({
    isOpen,
    searchQuery,
    fields,
    onClose,
    onSearchChange,
    onFieldSelect
}: FieldSelectionModalProps) {
    if (!isOpen) return null;

    // Fonction pour obtenir l'icône selon le type de champ
    const getFieldIcon = (field: Field) => {
        switch (field.type) {
            case FieldType.SINGLE_LINE_TEXT:
                return <TextAUnderlineIcon size={16} className="text-gray-gray600" />;
            case FieldType.MULTILINE_TEXT:
                return <TextTIcon size={16} className="text-gray-gray600" />;
            case FieldType.NUMBER:
                return <HashStraightIcon size={16} className="text-gray-gray600" />;
            case FieldType.SINGLE_SELECT:
                return <CaretCircleDownIcon size={16} className="text-gray-gray600" />;
            case FieldType.MULTIPLE_SELECTS:
                return <TagIcon size={16} className="text-gray-gray600" />;
            case FieldType.DATE:
                return <CalendarIcon size={16} className="text-gray-gray600" />;
            case FieldType.CHECKBOX:
                return <CheckSquareIcon size={16} className="text-gray-gray600" />;
            case FieldType.EMAIL:
                return <EnvelopeSimpleIcon size={16} className="text-gray-gray600" />;
            case FieldType.URL:
                return <LinkIcon size={16} className="text-gray-gray600" />;
            case FieldType.PHONE_NUMBER:
                return <PhoneIcon size={16} className="text-gray-gray600" />;
            case FieldType.CURRENCY:
                return <CurrencyDollarSimpleIcon size={16} className="text-gray-gray600" />;
            case FieldType.PERCENT:
                return <PercentIcon size={16} className="text-gray-gray600" />;
            case FieldType.RATING:
                return <StarIcon size={16} className="text-gray-gray600" />;
            case FieldType.FORMULA:
                return <FunctionIcon size={16} className="text-gray-gray600" />;
            case FieldType.ROLLUP:
                return <TrendUpIcon size={16} className="text-gray-gray600" />;
            case FieldType.MULTIPLE_RECORD_LINKS:
                return <LinkIcon size={16} className="text-gray-gray600" />;
            case FieldType.MULTIPLE_LOOKUP_VALUES:
                return <ListMagnifyingGlassIcon size={16} className="text-gray-gray600" />;
            case FieldType.CREATED_TIME:
            case FieldType.LAST_MODIFIED_TIME:
                return <ClockIcon size={16} className="text-gray-gray600" />;
            case FieldType.CREATED_BY:
            case FieldType.LAST_MODIFIED_BY:
                return <UserIcon size={16} className="text-gray-gray600" />;
            case FieldType.AUTO_NUMBER:
                return <HashIcon size={16} className="text-gray-gray600" />;
            case FieldType.BARCODE:
                return <BarcodeIcon size={16} className="text-gray-gray600" />;
            case FieldType.BUTTON:
                return <PlayIcon size={16} className="text-gray-gray600" />;
            case FieldType.COUNT:
                return <CalculatorIcon size={16} className="text-gray-gray600" />;
            case FieldType.DURATION:
                return <ClockIcon size={16} className="text-gray-gray600" />;
            case FieldType.MULTIPLE_ATTACHMENTS:
                return <PaperclipIcon size={16} className="text-gray-gray600" />;
            case FieldType.RICH_TEXT:
                return <ArticleNyTimesIcon size={16} className="text-gray-gray600" />;
            case FieldType.SINGLE_COLLABORATOR:
                return <UserIcon size={16} className="text-gray-gray600" />;
            case FieldType.MULTIPLE_COLLABORATORS:
                return <UsersIcon size={16} className="text-gray-gray600" />;
            default:
                return <FileIcon size={16} className="text-gray-gray600" />;
        }
    };

    const filteredFields = fields.filter(field => 
        field.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            {/* Overlay pour fermer le modal */}
            <div 
                className="fixed inset-0 z-20 bg-black bg-opacity-25"
                onClick={onClose}
            ></div>
            
            {/* Modal */}
            <div className="absolute top-16 left-4 z-30 bg-white rounded-lg shadow-lg border border-gray-gray200 w-80 max-h-96 overflow-hidden">
                {/* Barre de recherche */}
                <div className="p-3">
                    <div className="relative">
                        <MagnifyingGlassIcon 
                            size={16} 
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-gray400" 
                        />
                        <input
                            type="text"
                            placeholder="Rechercher un champ..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 text-base border border-gray-gray200 rounded-sm bg-gray-gray25 text-gray-gray800 placeholder-gray-gray400 focus:outline-none focus:ring-2 focus:ring-blue-blue focus:border-blue-blue"
                        />
                    </div>
                </div>
                
                {/* Liste des champs */}
                <div className="max-h-64 overflow-y-auto">
                    {filteredFields.map(field => (
                        <button
                            key={field.id}
                            onClick={() => onFieldSelect(field)}
                            className="w-full px-3 py-2 text-left hover:bg-gray-gray25 flex items-center space-x-3 text-base font-medium text-gray-gray800"
                        >
                            {getFieldIcon(field)}
                            <span className="flex-1">{field.name}</span>
                        </button>
                    ))}
                    {filteredFields.length === 0 && (
                        <div className="px-3 py-4 text-center text-sm text-gray-gray500">
                            Aucun champ trouvé
                        </div>
                    )}
                </div>
                
                {/* Fermer le modal */}
                <div className="p-2 border-t border-gray-gray200">
                    <button
                        onClick={onClose}
                        className="w-full px-3 py-2 text-base font-medium text-gray-gray600 hover:text-gray-gray800"
                    >
                        Annuler
                    </button>
                </div>
            </div>
        </>
    );
}
