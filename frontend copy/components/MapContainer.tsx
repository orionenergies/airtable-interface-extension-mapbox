import {useRef, useState} from 'react';
import MapBoxMap, {NavigationControl} from 'react-map-gl/mapbox';
import type {ViewStateChangeEvent, MapRef} from 'react-map-gl/mapbox';
import mapboxgl from 'mapbox-gl';
import type {Record} from '@airtable/blocks/interface/models';
import type {LocationData} from '../hooks/useLocationData';
import type {MapViewState} from '../hooks/useMapViewState';
import {MapMarker} from './MapMarker';
import {MapPopup} from './MapPopup';
import {GlobalViewButton} from './GlobalViewButton';
import {ResultCounters} from './ResultCounters';
import type {ColorCounter} from '../hooks/useColorCounters';
import type {Field} from '@airtable/blocks/interface/models';

interface MapContainerProps {
    viewState: MapViewState;
    onViewStateChange: (state: MapViewState) => void;
    mapboxApiKey: string;
    locations: LocationData[];
    getMarkerColor: (record: Record) => string;
    onMarkerClick: (location: LocationData, event: React.MouseEvent) => void;
    onMapReady: () => void;
    hideMapUntilCameraReady: boolean;
    totalCount: number;
    colorCounters: ColorCounter[];
    popupData: {
        record: Record;
        position: {x: number; y: number};
    } | null;
    labelField: Field | undefined;
    onViewRecord: (record: Record) => void;
    onZoomToLocation: (location: LocationData) => void;
    onClosePopup: () => void;
    onResetToGlobalView: () => void;
    regionFocus: string;
}

export function MapContainer({
    viewState,
    onViewStateChange,
    mapboxApiKey,
    locations,
    getMarkerColor,
    onMarkerClick,
    onMapReady,
    hideMapUntilCameraReady,
    totalCount,
    colorCounters,
    popupData,
    labelField,
    onViewRecord,
    onZoomToLocation,
    onClosePopup,
    onResetToGlobalView,
    regionFocus,
}: MapContainerProps) {
    const mapRef = useRef<MapRef | null>(null);
    const [hoveredLocationId, setHoveredLocationId] = useState<string | null>(null);

    return (
        <div className="flex-1 relative">
            {/* Compteurs de résultats */}
            <ResultCounters totalCount={totalCount} colorCounters={colorCounters} />
        
            {hideMapUntilCameraReady && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                    <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                        <span>Preparing map…</span>
                    </div>
                </div>
            )}
            
            <MapBoxMap
                mapLib={mapboxgl}
                {...viewState}
                style={{
                    width: '100%',
                    height: '100%',
                    visibility: hideMapUntilCameraReady ? 'hidden' : 'visible',
                }}
                onMove={(evt: ViewStateChangeEvent) => onViewStateChange(evt.viewState)}
                ref={mapRef}
                onLoad={onMapReady}
                mapboxAccessToken={mapboxApiKey}
                mapStyle={'mapbox://styles/mapbox/streets-v12'}
                minZoom={1}
                maxZoom={18}
            >
                <NavigationControl />

                {locations.map((location) => (
                    <MapMarker
                        key={location.id}
                        location={location}
                        markerColor={getMarkerColor(location.record)}
                        isHovered={hoveredLocationId === location.id}
                        isPopupOpen={popupData?.record.id === location.record.id}
                        onMouseEnter={() => setHoveredLocationId(location.id)}
                        onMouseLeave={() =>
                            setHoveredLocationId((prev) => (prev === location.id ? null : prev))
                        }
                        onClick={(event) => onMarkerClick(location, event)}
                    />
                ))}
            </MapBoxMap>

            {/* Popup */}
            {popupData && (
                <MapPopup
                    record={popupData.record}
                    labelField={labelField}
                    position={popupData.position}
                    onViewRecord={onViewRecord}
                    onZoomToLocation={(record) => {
                        // Trouver la location correspondante
                        const location = locations.find(loc => loc.record.id === record.id);
                        if (location) {
                            onZoomToLocation(location);
                        }
                    }}
                    onClose={onClosePopup}
                />
            )}

            {/* Bouton Vue globale */}
            <GlobalViewButton regionFocus={regionFocus} onResetView={onResetToGlobalView} />
        </div>
    );
}

