import {useEffect} from 'react';
import type {MapRef} from 'react-map-gl/mapbox';
import mapboxgl from 'mapbox-gl';
import type {LocationData} from './useLocationData';
import type {MapViewState} from './useMapViewState';
import {getRegionConfig} from '../utils/regionConfig';

export function useAutoCentering(
    isConfigured: boolean,
    isMapReady: boolean,
    autoCenterOnLoad: boolean,
    regionFocus: string,
    locations: LocationData[],
    mapRef: React.RefObject<MapRef | null>,
    setViewState: (state: MapViewState) => void,
    savedViewRef: React.RefObject<MapViewState | null>,
    initialCameraAppliedRef: React.RefObject<boolean>
) {
    useEffect(() => {
        if (!isConfigured || !isMapReady || initialCameraAppliedRef.current) return;

        if (autoCenterOnLoad && locations.length > 0) {
            if (locations.length === 1) {
                const only = locations[0];
                setViewState({
                    latitude: only.lat,
                    longitude: only.lng,
                    zoom: 12,
                });
            } else {
                const lats = locations.map((l) => l.lat);
                const lngs = locations.map((l) => l.lng);
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
                        const zoomValue = typeof camera.zoom === 'number' ? camera.zoom : 4.7;
                        setViewState({
                            latitude: center.lat,
                            longitude: center.lng,
                            zoom: Math.min(Math.max(zoomValue, 4), 16), // Zoom minimum à 4 pour voir la France
                        });
                    }
                } else {
                    const centerLat = (minLat + maxLat) / 2;
                    const centerLng = (minLng + maxLng) / 2;
                    setViewState({
                        latitude: centerLat,
                        longitude: centerLng,
                        zoom: 4.7, // Zoom pour voir la France entière
                    });
                }
            }
            initialCameraAppliedRef.current = true;
            return;
        }

        if (savedViewRef.current) {
            setViewState(savedViewRef.current);
        } else {
            // Si pas de vue sauvegardée, utiliser la configuration de région
            const regionConfig = getRegionConfig(regionFocus);
            setViewState({
                latitude: regionConfig.center[1],
                longitude: regionConfig.center[0],
                zoom: regionConfig.zoom,
            });
        }
        initialCameraAppliedRef.current = true;
    }, [
        isConfigured,
        isMapReady,
        autoCenterOnLoad,
        regionFocus,
        locations,
        mapRef,
        setViewState,
        savedViewRef,
        initialCameraAppliedRef,
    ]);
}

