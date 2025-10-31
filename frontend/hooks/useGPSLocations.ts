import {useMemo, useRef} from 'react';
import {Field, Record} from '@airtable/blocks/interface/models';
import {parseGPSCoordinates} from '../utils/gpsParser';
import type {LocationData} from '../types';
import type {AirtableColor} from '../constants';
import {DEFAULT_MARKER_COLOR} from '../constants';

interface UseGPSLocationsParams {
    records: ReadonlyArray<Record>;
    labelField: Field | undefined;
    gpsField: Field | undefined;
    isConfigured: boolean;
    colorField?: Field | null;
    colorConfiguration?: Map<string, AirtableColor>;
    valueVisibility?: Set<string>;
}

/**
 * Hook to parse GPS coordinates from Airtable records
 * @param params - Configuration parameters
 * @returns Array of valid location data
 */
export function useGPSLocations({
    records,
    labelField,
    gpsField,
    isConfigured,
    colorField,
    colorConfiguration,
    valueVisibility,
}: UseGPSLocationsParams): LocationData[] {
    const recordsHash = useMemo(() => {
        if (!isConfigured) return '';

        const relevantData = records.map((record) =>
            [
                record.id,
                record.getCellValueAsString(labelField!),
                record.getCellValueAsString(gpsField!),
                colorField ? record.getCellValueAsString(colorField) : '',
            ].join('::'),
        );

        return (
            relevantData.join('||') +
            JSON.stringify([...colorConfiguration?.entries() || []]) +
            JSON.stringify([...(valueVisibility || new Set())])
        );
    }, [records, labelField, gpsField, isConfigured, colorField, colorConfiguration, valueVisibility]);

    const previousHashRef = useRef<string>('');
    const stableDataRef = useRef<LocationData[]>([]);

    if (recordsHash !== previousHashRef.current) {
        previousHashRef.current = recordsHash;

        if (records && isConfigured) {
            const validLocations: LocationData[] = [];

            for (const record of records) {
                const gpsString = record.getCellValueAsString(gpsField!);
                const coords = parseGPSCoordinates(gpsString);

                if (coords) {
                    let color: AirtableColor | undefined = undefined;
                    let colorFieldValue: string | undefined = undefined;

                    if (colorField && colorConfiguration) {
                        colorFieldValue = record.getCellValueAsString(colorField);
                        if (colorFieldValue) {
                            // Vérifier si la valeur est visible
                            // Si valueVisibility est undefined ou vide Set, toutes les valeurs sont visibles
                            const isVisible =
                                !valueVisibility || valueVisibility.size === 0 || valueVisibility.has(colorFieldValue);

                            // Si la valeur n'est pas visible, on ne l'ajoute pas
                            if (!isVisible) {
                                continue;
                            }

                            color = colorConfiguration.get(colorFieldValue) || DEFAULT_MARKER_COLOR;
                        }
                    }

                    validLocations.push({
                        id: record.id,
                        name: record.getCellValueAsString(labelField!),
                        address: gpsString,
                        lat: coords.lat,
                        lng: coords.lng,
                        geoCache: null,
                        record: record,
                        color,
                        colorFieldValue,
                    });
                }
            }

            stableDataRef.current = validLocations;
        } else {
            stableDataRef.current = [];
        }
    }

    return stableDataRef.current;
}

