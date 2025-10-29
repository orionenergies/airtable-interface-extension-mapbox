import {useMemo} from 'react';
import type {LocationData} from '../types';
import type {AirtableColor} from '../constants';

export interface ColorCounter {
    color: AirtableColor;
    count: number;
    values: string[];
}

export function useColorCounters(
    locations: LocationData[],
    colorFieldId: string | null,
): ColorCounter[] {
    return useMemo(() => {
        // Si aucun champ de couleur, retourner tableau vide
        if (!colorFieldId) return [];

        // Compter les points par couleur et collecter les valeurs
        const colorCounts: {[color: string]: {count: number; values: Set<string>}} = {};

        locations.forEach((location) => {
            const color = location.color;
            const fieldValue = location.colorFieldValue;

            if (color && fieldValue) {
                if (!colorCounts[color]) {
                    colorCounts[color] = {count: 0, values: new Set()};
                }
                colorCounts[color].count++;
                colorCounts[color].values.add(fieldValue);
            }
        });

        // Convertir en array
        return Object.entries(colorCounts)
            .map(([color, data]) => ({
                color: color as AirtableColor,
                count: data.count,
                values: Array.from(data.values),
            }))
            .sort((a, b) => b.count - a.count); // Trier par nombre décroissant
    }, [locations, colorFieldId]);
}

