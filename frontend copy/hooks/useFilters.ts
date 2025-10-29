import {useState} from 'react';
import {Field, Record} from '@airtable/blocks/interface/models';

export interface ValueColor {
    [value: string]: string; // value -> colorId mapping
}

export interface Filter {
    id: string;
    field: Field;
    values: string[]; // Array de valeurs sélectionnées
    color: string; // Couleur du filtre (pour l'affichage du bouton)
    valueColors: ValueColor; // Couleurs personnalisées par valeur
    operator: 'is' | 'isNot' | 'isEmpty' | 'isNotEmpty'; // Opérateur de filtre
}

export function useFilters() {
    const [activeFilters, setActiveFilters] = useState<Filter[]>([]);
    const [colorFilterId, setColorFilterId] = useState<string | null>(null); // ID du filtre avec personnalisation de couleurs
    
    // État pour le modal de sélection de champs
    const [showFieldModal, setShowFieldModal] = useState(false);
    const [fieldSearchQuery, setFieldSearchQuery] = useState('');
    
    // État pour le modal de sélection de valeurs
    const [showValueModal, setShowValueModal] = useState(false);
    const [selectedFieldForValues, setSelectedFieldForValues] = useState<Field | null>(null);
    const [valueSearchQuery, setValueSearchQuery] = useState('');
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    // Fonctions pour gérer les filtres personnalisés
    const addFilter = (field: Field) => {
        // Vérifier si un filtre existe déjà pour ce champ
        const existingFilter = activeFilters.find(f => f.field.id === field.id);
        if (existingFilter) return; // Ne pas ajouter de doublon
        
        const filterId = field.id;
        const colors = ['bg-blue-blue', 'bg-red-red', 'bg-green-green', 'bg-yellow-yellow', 'bg-purple-purple', 'bg-pink-pink', 'bg-orange-orange', 'bg-gray-gray500'];
        const color = colors[activeFilters.length % colors.length];
        
        setActiveFilters(prev => [...prev, {
            id: filterId,
            field,
            values: [], // Initialement vide, l'utilisateur va sélectionner les valeurs
            color,
            valueColors: {}, // Aucune couleur personnalisée par défaut
            operator: 'is' // Opérateur par défaut
        }]);
        
        // Fermer le modal de sélection de champ
        setShowFieldModal(false);
    };

    const handleFieldSelect = (field: Field) => {
        addFilter(field);
    };
    
    const updateFilterValues = (filterId: string, values: string[], closeModal: boolean = true) => {
        setActiveFilters(prev => {
            const updated = prev.map(filter => {
                if (filter.id !== filterId) return filter;
                
                // Assigner automatiquement la couleur grise par défaut aux nouvelles valeurs
                const updatedValueColors = {...filter.valueColors};
                values.forEach(value => {
                    if (!updatedValueColors[value]) {
                        updatedValueColors[value] = 'gray'; // Couleur grise par défaut
                    }
                });
                
                return {
                    ...filter, 
                    values,
                    valueColors: updatedValueColors
                };
            });
            
            // Vérifier si ce filtre a maintenant des couleurs et définir comme colorFilterId
            const updatedFilter = updated.find(f => f.id === filterId);
            if (updatedFilter && Object.keys(updatedFilter.valueColors).length > 0 && !colorFilterId) {
                setColorFilterId(filterId);
            }
            
            return updated;
        });
        
        // Fermer le modal seulement si demandé (pour permettre les sélections multiples)
        if (closeModal) {
            setShowValueModal(false);
            setSelectedFieldForValues(null);
            setSelectedValues([]);
            setValueSearchQuery('');
        }
    };
    
    const openFilterDropdown = (filter: Filter) => {
        setSelectedFieldForValues(filter.field);
        setSelectedValues(filter.values);
        setShowValueModal(true);
        setValueSearchQuery('');
    };

    const openFieldModal = () => {
        setShowFieldModal(true);
        setFieldSearchQuery('');
    };

    // Fonctions pour gérer la sélection de valeurs
    const toggleValueSelection = (value: string) => {
        setSelectedValues(prev => {
            const newValues = prev.includes(value) 
                ? prev.filter(v => v !== value)
                : [...prev, value];
            
            // Appliquer immédiatement la sélection (comportement natif Airtable)
            if (selectedFieldForValues) {
                const filter = activeFilters.find(f => f.field.id === selectedFieldForValues.id);
                if (filter) {
                    // Utiliser setTimeout pour s'assurer que le state est mis à jour
                    // Ne pas fermer le modal pour permettre les sélections multiples
                    setTimeout(() => {
                        updateFilterValues(filter.id, newValues, false);
                    }, 0);
                }
            }
            
            return newValues;
        });
    };

    const clearValueSelection = () => {
        // Appliquer immédiatement la désélection totale
        if (selectedFieldForValues) {
            const filter = activeFilters.find(f => f.field.id === selectedFieldForValues.id);
            if (filter) {
                updateFilterValues(filter.id, [], false); // Ne pas fermer le modal
            }
        }
        setSelectedValues([]);
    };

    const applyValueFilter = () => {
        // Cette fonction n'est plus nécessaire mais on la garde pour compatibilité
        if (selectedFieldForValues) {
            const filter = activeFilters.find(f => f.field.id === selectedFieldForValues.id);
            if (filter) {
                updateFilterValues(filter.id, selectedValues);
            }
        }
    };

    const removeFilter = (filterId: string) => {
        setActiveFilters(prev => prev.filter(filter => filter.id !== filterId));
        
        // Si on supprime le filtre avec couleurs personnalisées, réinitialiser
        if (filterId === colorFilterId) {
            setColorFilterId(null);
        }
    };

    const setFilterOperator = (filterId: string, operator: 'is' | 'isNot' | 'isEmpty' | 'isNotEmpty') => {
        setActiveFilters(prev => prev.map(filter => 
            filter.id === filterId 
                ? {...filter, operator} 
                : filter
        ));
    };

    const setCurrentFilterOperator = (operator: 'is' | 'isNot' | 'isEmpty' | 'isNotEmpty') => {
        if (selectedFieldForValues) {
            setFilterOperator(selectedFieldForValues.id, operator);
        }
    };

    const setValueColor = (filterId: string, value: string, colorId: string) => {
        setActiveFilters(prev => prev.map(filter => 
            filter.id === filterId 
                ? {...filter, valueColors: {...filter.valueColors, [value]: colorId}} 
                : filter
        ));
        
        // Définir ce filtre comme le filtre avec personnalisation de couleurs
        // Cela se fait automatiquement lors de l'assignation de couleur
        if (!colorFilterId) {
            setColorFilterId(filterId);
        }
    };

    const changeFilterField = (filterId: string, newField: Field) => {
        setActiveFilters(prev => prev.map(filter => 
            filter.id === filterId 
                ? {
                    ...filter, 
                    field: newField,
                    values: [], // Réinitialiser les valeurs quand on change de champ
                    valueColors: {} // Réinitialiser les couleurs
                } 
                : filter
        ));
        
        // Si c'était le filtre avec personnalisation de couleurs, le réinitialiser
        if (filterId === colorFilterId) {
            setColorFilterId(null);
        }
    };
    
    const canCustomizeColors = (filterId: string): boolean => {
        // Peut personnaliser si aucun filtre n'a de couleurs OU si c'est le filtre actuel avec couleurs
        return colorFilterId === null || colorFilterId === filterId;
    };

    const getMarkerColor = (record: Record): string => {
        // Trouver le premier filtre actif qui correspond à ce record
        for (const filter of activeFilters) {
            if (filter.values.length === 0) continue; // Ignorer les filtres sans valeurs sélectionnées
            
            const fieldValue = record.getCellValueAsString(filter.field);
            if (filter.values.includes(fieldValue)) {
                // Si une couleur personnalisée est définie pour cette valeur, l'utiliser
                if (filter.valueColors[fieldValue]) {
                    // Convertir l'ID de couleur en classe Tailwind Airtable
                    const colorId = filter.valueColors[fieldValue];
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
                }
                // Sinon, utiliser la couleur par défaut du filtre
                return filter.color;
            }
        }
        return 'bg-gray-gray500'; // Couleur par défaut
    };
    
    // Vérifier si un record correspond aux filtres actifs
    const recordMatchesFilters = (record: Record): boolean => {
        // Si aucun filtre n'est actif, afficher tous les records
        if (activeFilters.length === 0) return true;
        
        // Filtrer les filtres qui ont des valeurs sélectionnées ou qui utilisent des opérateurs de vide
        const activeFiltersWithValues = activeFilters.filter(f => 
            f.values.length > 0 || f.operator === 'isEmpty' || f.operator === 'isNotEmpty'
        );
        
        // Si aucun filtre n'est actif, afficher tous les records
        if (activeFiltersWithValues.length === 0) return true;
        
        // Un record doit correspondre à TOUS les filtres actifs (AND)
        return activeFiltersWithValues.every(filter => {
            const fieldValue = record.getCellValueAsString(filter.field);
            
            switch (filter.operator) {
                case 'is':
                    return filter.values.includes(fieldValue);
                case 'isNot':
                    return !filter.values.includes(fieldValue);
                case 'isEmpty':
                    return !fieldValue || fieldValue.trim() === '';
                case 'isNotEmpty':
                    return fieldValue && fieldValue.trim() !== '';
                default:
                    return filter.values.includes(fieldValue);
            }
        });
    };

    return {
        // État
        activeFilters,
        showFieldModal,
        fieldSearchQuery,
        showValueModal,
        selectedFieldForValues,
        valueSearchQuery,
        selectedValues,
        
        // Actions
        addFilter,
        handleFieldSelect,
        openFieldModal,
        openFilterDropdown,
        toggleValueSelection,
        clearValueSelection,
        applyValueFilter,
        updateFilterValues,
        removeFilter,
        setValueColor,
        setFilterOperator,
        setCurrentFilterOperator,
        changeFilterField,
        canCustomizeColors,
        getMarkerColor,
        recordMatchesFilters,
        colorFilterId,
        
        // Setters
        setShowFieldModal,
        setFieldSearchQuery,
        setShowValueModal,
        setSelectedFieldForValues,
        setValueSearchQuery,
        setSelectedValues,
    };
}
