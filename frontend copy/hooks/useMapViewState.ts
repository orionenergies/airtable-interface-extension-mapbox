import {useState, useEffect, useRef} from 'react';

export interface MapViewState {
    longitude: number;
    latitude: number;
    zoom: number;
}

/**
 * Manages map view state and localStorage persistence
 */
export function useMapViewState(storageKey: string, defaultState: MapViewState) {
    const [viewState, setViewState] = useState<MapViewState>(defaultState);
    const savedViewRef = useRef<MapViewState | null>(null);
    const initialCameraAppliedRef = useRef<boolean>(false);

    // Load saved view from localStorage
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
            // ignore
        }
    }, [storageKey]);

    // Persist view to localStorage
    useEffect(() => {
        try {
            localStorage.setItem(storageKey, JSON.stringify(viewState));
        } catch {
            // ignore
        }
    }, [storageKey, viewState]);

    return {viewState, setViewState, savedViewRef, initialCameraAppliedRef};
}

