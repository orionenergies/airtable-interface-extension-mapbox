import {useState, useEffect, useRef} from 'react';
import type {MapViewState} from '../types';

/**
 * Manages map view state and localStorage persistence
 * @param storageKey - Key for localStorage
 * @param defaultState - Default view state
 * @returns View state management object
 */
export function useMapViewState(storageKey: string, defaultState: MapViewState) {
    const [viewState, setViewState] = useState<MapViewState>(defaultState);
    const savedViewRef = useRef<MapViewState | null>(null);
    const initialCameraAppliedRef = useRef<boolean>(false);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(storageKey);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (
                    parsed &&
                    typeof parsed.latitude === 'number' &&
                    typeof parsed.longitude === 'number' &&
                    typeof parsed.zoom === 'number'
                ) {
                    savedViewRef.current = parsed as MapViewState;
                }
            }
        } catch {
            // Ignore parsing errors
        }
    }, [storageKey]);

    useEffect(() => {
        try {
            localStorage.setItem(storageKey, JSON.stringify(viewState));
        } catch {
            // Ignore storage errors
        }
    }, [storageKey, viewState]);

    return {viewState, setViewState, savedViewRef, initialCameraAppliedRef};
}

