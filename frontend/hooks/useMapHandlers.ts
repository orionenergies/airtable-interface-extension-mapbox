import {useCallback} from 'react';
import type {MapRef} from 'react-map-gl/mapbox';
import mapboxgl from 'mapbox-gl';
import {expandRecord} from '@airtable/blocks/interface/ui';
import type {Table} from '@airtable/blocks/interface/models';
import type {LocationData} from '../types';
import {
    MARKER_ZOOM_LEVEL,
    SINGLE_LOCATION_ZOOM,
    MIN_ZOOM,
    MAX_ZOOM,
    BOUNDS_PADDING,
} from '../constants';

interface UseMapHandlersParams {
    mapRef: React.RefObject<MapRef | null>;
    table: Table;
    locations: LocationData[];
    setViewState: (viewState: {latitude: number; longitude: number; zoom: number}) => void;
    setActiveMenuLocationId: (id: string | null) => void;
}

/**
 * Hook to manage map interaction handlers
 */
export function useMapHandlers({
    mapRef,
    table,
    locations,
    setViewState,
    setActiveMenuLocationId,
}: UseMapHandlersParams) {
    // Handle marker click - toggle menu
    const handleMarkerClick = useCallback(
        (location: LocationData, event: React.MouseEvent) => {
            event.stopPropagation();
            setActiveMenuLocationId((prev: string | null) =>
                prev === location.id ? null : location.id,
            );
        },
        [setActiveMenuLocationId],
    );

    const handleZoomToLocation = useCallback(
        (location: LocationData) => {
            const mapInstance = mapRef.current?.getMap?.();
            if (mapInstance) {
                mapInstance.flyTo({
                    center: [location.lng!, location.lat!],
                    zoom: MARKER_ZOOM_LEVEL,
                });
            } else {
                setViewState({
                    latitude: location.lat!,
                    longitude: location.lng!,
                    zoom: MARKER_ZOOM_LEVEL,
                });
            }
            setActiveMenuLocationId(null);
        },
        [mapRef, setViewState, setActiveMenuLocationId],
    );

    const handleShowDetails = useCallback(
        (location: LocationData) => {
            const shouldExpandRecords = table.hasPermissionToExpandRecords();
            if (shouldExpandRecords) {
                expandRecord(location.record);
            }
            setActiveMenuLocationId(null);
        },
        [table, setActiveMenuLocationId],
    );

    const handleRecenter = useCallback(() => {
        if (locations.length === 0) return;

        if (locations.length === 1) {
            const only = locations[0];
            const mapInstance = mapRef.current?.getMap?.();
            if (mapInstance) {
                mapInstance.flyTo({
                    center: [only.lng!, only.lat!],
                    zoom: SINGLE_LOCATION_ZOOM,
                });
            } else {
                setViewState({
                    latitude: only.lat!,
                    longitude: only.lng!,
                    zoom: SINGLE_LOCATION_ZOOM,
                });
            }
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
                const camera = mapInstance.cameraForBounds(bounds, {padding: BOUNDS_PADDING});
                if (camera && camera.center) {
                    const center = mapboxgl.LngLat.convert(
                        camera.center as mapboxgl.LngLatLike,
                    );
                    const zoomValue = typeof camera.zoom === 'number' ? camera.zoom : 8;
                    mapInstance.flyTo({
                        center: [center.lng, center.lat],
                        zoom: Math.min(Math.max(zoomValue, MIN_ZOOM), MAX_ZOOM),
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
    }, [locations, mapRef, setViewState]);

    return {
        handleMarkerClick,
        handleZoomToLocation,
        handleShowDetails,
        handleRecenter,
    };
}

