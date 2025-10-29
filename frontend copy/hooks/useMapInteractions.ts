import {useState, useCallback} from 'react';
import {expandRecord} from '@airtable/blocks/interface/ui';
import {Table, Record} from '@airtable/blocks/interface/models';
import type {MapRef} from 'react-map-gl/mapbox';
import type {LocationData} from './useLocationData';
import type {MapViewState} from './useMapViewState';
import {getRegionConfig} from '../utils/regionConfig';

export function useMapInteractions(
    table: Table,
    zoomToPinOnClick: boolean,
    regionFocus: string,
    mapRef: React.RefObject<MapRef | null>,
    setViewState: (state: MapViewState) => void
) {
    const [hoveredLocationId, setHoveredLocationId] = useState<string | null>(null);
    const [popupData, setPopupData] = useState<{
        record: Record;
        position: {x: number; y: number};
    } | null>(null);

    const handleMarkerClick = useCallback((location: LocationData, event: React.MouseEvent) => {
        // Empêcher le comportement par défaut
        event.preventDefault();
        event.stopPropagation();
        
        // Calculer la position du popup
        const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
        const popupPosition = {
            x: rect.left + rect.width / 2,
            y: rect.top
        };
        
        // Afficher le popup
        setPopupData({
            record: location.record,
            position: popupPosition
        });
    }, []);

    const handleViewRecord = useCallback((record: Record) => {
        const shouldExpandRecords = table.hasPermissionToExpandRecords();
        if (shouldExpandRecords) {
            expandRecord(record);
        }
    }, [table]);

    const handleZoomToLocation = useCallback((location: LocationData) => {
        const mapInstance = mapRef.current?.getMap?.();
        const desiredZoom = 25;
        if (mapInstance) {
            mapInstance.flyTo({
                center: [location.lng, location.lat],
                zoom: desiredZoom,
            });
        } else {
            setViewState({
                latitude: location.lat,
                longitude: location.lng,
                zoom: desiredZoom,
            });
        }
    }, [mapRef, setViewState]);

    const closePopup = useCallback(() => {
        setPopupData(null);
    }, []);

    const resetToGlobalView = useCallback(() => {
        const regionConfig = getRegionConfig(regionFocus);
        const mapInstance = mapRef.current?.getMap?.();
        if (mapInstance) {
            mapInstance.flyTo({
                center: regionConfig.center,
                zoom: regionConfig.zoom,
            });
        } else {
            setViewState({
                longitude: regionConfig.center[0],
                latitude: regionConfig.center[1],
                zoom: regionConfig.zoom,
            });
        }
    }, [regionFocus, mapRef, setViewState]);

    return {
        hoveredLocationId,
        setHoveredLocationId,
        handleMarkerClick,
        popupData,
        handleViewRecord,
        handleZoomToLocation,
        closePopup,
        resetToGlobalView,
    };
}

