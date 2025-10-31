import {useEffect} from 'react';
import type {MapRef} from 'react-map-gl/mapbox';
import mapboxgl from 'mapbox-gl';
import type {LocationData} from '../types';

interface UseInitialMapViewParams {
    isConfigured: boolean;
    isMapReady: boolean;
    autoCenterOnLoad: boolean;
    locations: LocationData[];
    mapRef: React.RefObject<MapRef | null>;
    savedViewRef: React.RefObject<{latitude: number; longitude: number; zoom: number} | null>;
    initialCameraAppliedRef: React.RefObject<boolean>;
    setViewState: (viewState: {latitude: number; longitude: number; zoom: number}) => void;
}

/**
 * Hook to handle initial map view positioning
 * Decides between auto-fit and saved view
 */
export function useInitialMapView({
    isConfigured,
    isMapReady,
    autoCenterOnLoad,
    locations,
    mapRef,
    savedViewRef,
    initialCameraAppliedRef,
    setViewState,
}: UseInitialMapViewParams) {
    useEffect(() => {
        if (!isConfigured || !isMapReady || initialCameraAppliedRef.current) return;

        // 1) Prefer auto-fit when allowed and locations are available
        if (autoCenterOnLoad && locations.length > 0) {
            if (locations.length === 1) {
                const only = locations[0];
                setViewState({
                    latitude: only.lat!,
                    longitude: only.lng!,
                    zoom: 12,
                });
            } else {
                const lats = locations.map((l) => l.lat!);
                const lngs = locations.map((l) => l.lng!);
                const minLat = Math.min(...lats);
                const maxLat = Math.max(...lats);
                const minLng = Math.min(...lngs);
                const maxLng = Math.max(...lngs);

                const bounds = new mapboxgl.LngLatBounds([minLng, minLat], [maxLng, maxLat]);

                const mapInstance = mapRef.current?.getMap?.();
                if (mapInstance) {
                    const camera = mapInstance.cameraForBounds(bounds, {padding: 80});
                    if (camera && camera.center) {
                        const center = mapboxgl.LngLat.convert(
                            camera.center as mapboxgl.LngLatLike,
                        );
                        const zoomValue = typeof camera.zoom === 'number' ? camera.zoom : 8;
                        setViewState({
                            latitude: center.lat,
                            longitude: center.lng,
                            zoom: Math.min(Math.max(zoomValue, 1), 16),
                        });
                    }
                } else {
                    const centerLat = (minLat + maxLat) / 2;
                    const centerLng = (minLng + maxLng) / 2;
                    setViewState({
                        latitude: centerLat,
                        longitude: centerLng,
                        zoom: 8,
                    });
                }
            }
            initialCameraAppliedRef.current = true;
            return;
        }

        // 2) Otherwise, apply saved view if available; regardless, mark as applied to avoid re-runs
        if (savedViewRef.current) {
            setViewState(savedViewRef.current);
        }
        initialCameraAppliedRef.current = true;
    }, [
        isConfigured,
        isMapReady,
        autoCenterOnLoad,
        locations,
        mapRef,
        savedViewRef,
        initialCameraAppliedRef,
        setViewState,
    ]);
}

