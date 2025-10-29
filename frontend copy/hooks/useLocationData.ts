import {useMemo} from 'react';
import {Field, Record} from '@airtable/blocks/interface/models';

export interface LocationData {
    id: string;
    name: string;
    address: string;
    lat: number;
    lng: number;
    geoCache: string;
    record: Record;
}

export function useLocationData(
    records: Record[] | null,
    labelField: Field | undefined,
    coordinateField: Field | undefined,
    isConfigured: boolean,
    filterFunction?: (record: Record) => boolean
): LocationData[] {
    return useMemo(() => {
        if (!isConfigured || !records || !labelField || !coordinateField) return [];

        const validLocations: LocationData[] = [];
        
        records.forEach((record) => {
            // Appliquer le filtre si fourni
            if (filterFunction && !filterFunction(record)) {
                return; // Ignorer ce record s'il ne correspond pas aux filtres
            }
            
            const coordinateValue = record.getCellValueAsString(coordinateField);
            const coordinates = parseCoordinates(coordinateValue);
            
            if (coordinates) {
                validLocations.push({
                    id: record.id,
                    name: record.getCellValueAsString(labelField) || record.id,
                    address: coordinateValue, // Store original coordinate string
                    lat: coordinates[0],
                    lng: coordinates[1],
                    geoCache: coordinateValue,
                    record: record,
                });
            }
        });
        
        return validLocations;
    }, [records, labelField, coordinateField, isConfigured, filterFunction]);
}

// Fonction pour parser les coordonnées GPS
function parseCoordinates(gpsString: string): [number, number] | null {
    if (!gpsString) return null;
    
    // Convertir en string et nettoyer
    const cleanString = String(gpsString).trim();
    
    // Essayer différents formats de séparation
    let coords: number[];
    if (cleanString.includes(',')) {
        coords = cleanString.split(',').map(coord => parseFloat(coord.trim()));
    } else if (cleanString.includes(';')) {
        coords = cleanString.split(';').map(coord => parseFloat(coord.trim()));
    } else if (cleanString.includes(' ')) {
        coords = cleanString.split(' ').map(coord => parseFloat(coord.trim()));
    } else {
        return null;
    }
    
    // Vérifier que nous avons exactement 2 coordonnées valides
    if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
        // Vérifier que les coordonnées sont dans des plages raisonnables
        const lat = coords[0];
        const lng = coords[1];
        
        // France: latitude entre 41 et 52, longitude entre -6 et 10
        if (lat >= 41 && lat <= 52 && lng >= -6 && lng <= 10) {
            return [lat, lng]; // [latitude, longitude]
        }
    }
    
    return null;
}
