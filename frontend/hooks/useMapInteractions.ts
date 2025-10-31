import {useState, useEffect, useRef} from 'react';
import type {MapRef} from 'react-map-gl/mapbox';

/**
 * Hook to manage map interactions (hover, active menu, info modal)
 */
export function useMapInteractions(mapRef: React.RefObject<MapRef | null>) {
    const [hoveredLocationId, setHoveredLocationId] = useState<string | null>(null);
    const [activeMenuLocationId, setActiveMenuLocationId] = useState<string | null>(null);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

    // Close menu when clicking on the map
    useEffect(() => {
        const handleMapClick = () => {
            if (activeMenuLocationId) {
                setActiveMenuLocationId(null);
            }
        };

        const mapInstance = mapRef.current?.getMap?.();
        if (mapInstance) {
            mapInstance.on('click', handleMapClick);
            return () => {
                mapInstance.off('click', handleMapClick);
            };
        }
    }, [activeMenuLocationId, mapRef]);

    return {
        hoveredLocationId,
        setHoveredLocationId,
        activeMenuLocationId,
        setActiveMenuLocationId,
        isInfoModalOpen,
        setIsInfoModalOpen,
    };
}

