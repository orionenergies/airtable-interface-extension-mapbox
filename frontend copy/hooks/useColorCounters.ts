import {useMemo} from 'react';
import type {LocationData} from './useLocationData';
import type {Filter} from './useFilters';

const AIRTABLE_COLORS = [
    {id: 'blue', bg: 'bg-blue-blue'},
    {id: 'cyan', bg: 'bg-cyan-cyan'},
    {id: 'teal', bg: 'bg-teal-teal'},
    {id: 'green', bg: 'bg-green-green'},
    {id: 'yellow', bg: 'bg-yellow-yellow'},
    {id: 'orange', bg: 'bg-orange-orange'},
    {id: 'red', bg: 'bg-red-red'},
    {id: 'pink', bg: 'bg-pink-pink'},
    {id: 'purple', bg: 'bg-purple-purple'},
    {id: 'gray', bg: 'bg-gray-gray500'}
];

export interface ColorCounter {
    colorId: string;
    count: number;
    bgClass: string;
    values: string[]; // Valeurs du filtre qui utilisent cette couleur
}

export function useColorCounters(
    locations: LocationData[],
    colorFilterId: string | null,
    activeFilters: Filter[]
): ColorCounter[] {
    // Extraire les valeurs et couleurs du filtre actif pour les dépendances
    const colorFilter = activeFilters.find(f => f.id === colorFilterId);
    const filterValues = colorFilter?.values || [];
    const filterValueColors = colorFilter?.valueColors || {};
    
    // Créer des chaînes stables pour les dépendances
    const valuesKey = JSON.stringify(filterValues);
    const colorsKey = JSON.stringify(filterValueColors);
    
    return useMemo(() => {
        // Si aucun filtre avec couleurs, retourner tableau vide
        if (!colorFilterId) return [];

        // Trouver le filtre avec personnalisation de couleurs
        const colorFilter = activeFilters.find(f => f.id === colorFilterId);
        if (!colorFilter) return [];
        
        // Vérifier qu'il y a au moins une couleur assignée
        const hasColors = Object.keys(colorFilter.valueColors).length > 0;
        if (!hasColors) return [];

        // Vérifier qu'il y a au moins une valeur sélectionnée
        if (colorFilter.values.length === 0) return [];

        // Compter les points par couleur et collecter les valeurs
        const colorCounts: {[colorId: string]: {count: number; values: Set<string>}} = {};

        locations.forEach(location => {
            const fieldValue = location.record.getCellValueAsString(colorFilter.field);
            const colorId = colorFilter.valueColors[fieldValue];
            
            // Compter seulement si la valeur est dans les valeurs sélectionnées
            if (colorId && colorFilter.values.includes(fieldValue)) {
                if (!colorCounts[colorId]) {
                    colorCounts[colorId] = {count: 0, values: new Set()};
                }
                colorCounts[colorId].count++;
                colorCounts[colorId].values.add(fieldValue);
            }
        });

        // Convertir en array avec les classes Tailwind
        return Object.entries(colorCounts).map(([colorId, data]) => {
            const airtableColor = AIRTABLE_COLORS.find((c: {id: string; bg: string}) => c.id === colorId);
            return {
                colorId,
                count: data.count,
                bgClass: airtableColor?.bg || 'bg-gray-gray500',
                values: Array.from(data.values)
            };
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [locations, colorFilterId, activeFilters, valuesKey, colorsKey]);
}
