import {useState, useEffect} from 'react';
import type {MarkerIconType} from '../components';
import {DEFAULT_MARKER_SIZE, DEFAULT_MARKER_ICON_TYPE} from '../components';

/**
 * Hook to manage marker customization (size and icon type) with localStorage persistence
 */
export function useMarkerCustomization(baseId: string, tableId: string) {
    const [markerSize, setMarkerSize] = useState<number>(() => {
        try {
            const saved = localStorage.getItem(`markerSize:${baseId}:${tableId}`);
            return saved ? Number(saved) : DEFAULT_MARKER_SIZE;
        } catch {
            return DEFAULT_MARKER_SIZE;
        }
    });

    const [markerIconType, setMarkerIconType] = useState<MarkerIconType>(() => {
        try {
            const saved = localStorage.getItem(`markerIconType:${baseId}:${tableId}`);
            return (saved as MarkerIconType) || DEFAULT_MARKER_ICON_TYPE;
        } catch {
            return DEFAULT_MARKER_ICON_TYPE;
        }
    });

    // Persist marker size
    useEffect(() => {
        try {
            localStorage.setItem(`markerSize:${baseId}:${tableId}`, markerSize.toString());
        } catch {
            // Ignore
        }
    }, [markerSize, baseId, tableId]);

    // Persist marker icon type
    useEffect(() => {
        try {
            localStorage.setItem(`markerIconType:${baseId}:${tableId}`, markerIconType);
        } catch {
            // Ignore
        }
    }, [markerIconType, baseId, tableId]);

    return {
        markerSize,
        markerIconType,
        setMarkerSize,
        setMarkerIconType,
    };
}

