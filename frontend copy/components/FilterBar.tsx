import type {Filter} from '../hooks/useFilters';

interface FilterBarProps {
    activeFilters: Filter[];
    onRemoveFilter: (filterId: string) => void;
    onOpenFieldModal: () => void;
    onOpenFilterDropdown: (filter: Filter) => void;
}

export function FilterBar({activeFilters, onRemoveFilter, onOpenFieldModal, onOpenFilterDropdown}: FilterBarProps) {
    return (
        <div className="bg-white border-b border-gray-gray200 p-3">
            <div className="flex items-center space-x-3 flex-wrap gap-y-2">
                <span className="text-md font-medium text-gray-gray700">Filtres:</span>
                
                {/* Filtres actifs sous forme de boutons dropdown */}
                {activeFilters.map(filter => (
                    <div key={filter.id} className="flex items-center bg-white border border-gray-gray200 rounded-sm shadow-xs">
                        {/* Bouton dropdown unique pour le filtre complet */}
                        <button
                            onClick={() => onOpenFilterDropdown(filter)}
                            className="flex items-center space-x-2 px-3 py-1.5 hover:bg-gray-gray25 transition-colors whitespace-nowrap"
                        >
                            <span className="text-base font-medium text-gray-gray800">
                                {filter.values.length === 0 
                                    ? filter.field.name
                                    : `${filter.field.name} ${filter.operator === 'is' ? 'est' : filter.operator === 'isNot' ? "n'est pas" : filter.operator === 'isEmpty' ? 'est vide' : "n'est pas vide"} ${filter.values.length === 1 
                                        ? filter.values[0]
                                        : `${filter.values.length} sélectionné${filter.values.length > 1 ? 's' : ''}`
                                    }`
                                }
                            </span>
                            <svg className="w-3 h-3 text-gray-gray500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        
                        {/* Bouton de suppression */}
                        <button
                            onClick={() => onRemoveFilter(filter.id)}
                            className="px-2 py-1.5 text-gray-gray400 hover:text-red-red hover:bg-gray-gray25 transition-colors border-l border-gray-gray200"
                        >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ))}
                
                {/* Bouton pour ajouter un filtre */}
                <button
                    onClick={onOpenFieldModal}
                    className="flex items-center space-x-1 bg-blue-blue hover:bg-blue-blueDark1 text-white px-3 py-1.5 rounded-sm transition-colors text-sm font-medium whitespace-nowrap shadow-sm"
                >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Ajouter un filtre</span>
                </button>
            </div>
        </div>
    );
}
