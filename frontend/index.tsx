import {useCallback, useEffect, useState, useMemo, useRef} from 'react';
import {
    initializeBlock,
    useBase,
    useRecords,
    useCustomProperties,
    expandRecord,
} from '@airtable/blocks/interface/ui';
import {FieldType, Base, Field} from '@airtable/blocks/interface/models';
import MapBoxMap, {NavigationControl} from 'react-map-gl/mapbox';
import type {ViewStateChangeEvent, MapRef} from 'react-map-gl/mapbox';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './style.css';

import type {LocationData} from './types';
import {
    DEFAULT_MAP_VIEW,
    MARKER_ZOOM_LEVEL,
    SINGLE_LOCATION_ZOOM,
    MIN_ZOOM,
    MAX_ZOOM,
    BOUNDS_PADDING,
} from './constants';
import {useMapViewState, useGPSLocations, useColorCustomization, useColorCounters} from './hooks';
import {
    ConfigurationScreen,
    PointsCounter,
    RecenterButton,
    MapMarker,
    ColorCustomizationBar,
    ColorFieldSelectionModal,
    ColorValuesModal,
} from './components';

function MapExtensionApp() {
    const base = useBase();
    const table = base.tables[0];
    const records = useRecords(table);

    // A list of properties that can be configured for this extension
    const getCustomProperties = useCallback((base: Base) => {
        const table = base.tables[0];
        const textFieldTypes = [FieldType.SINGLE_LINE_TEXT, FieldType.MULTILINE_TEXT];
        const textFields = table.fields.filter(
            (field: Field) =>
                // Text fields
                textFieldTypes.includes(field.type) ||
                // Fields that produce a text value
                (field.config.options &&
                    'result' in field.config.options &&
                    field.config.options.result &&
                    textFieldTypes.includes(field.config.options.result.type)),
        );

        return [
            {
                key: 'mapboxApiKey',
                type: 'string' as const,
                label: 'Mapbox token',
                defaultValue: '',
            },
            {
                key: 'labelField',
                type: 'field' as const,
                label: 'Label field',
                table: table,
                possibleValues: textFields,
            },
            {
                key: 'gpsField',
                type: 'field' as const,
                label: 'GPS coordinates field',
                table: table,
                possibleValues: textFields,
            },
            {
                key: 'autoCenterOnLoad',
                type: 'boolean' as const,
                label: 'Automatically center map',
                defaultValue: true,
            },
        ];
    }, []);

    const {customPropertyValueByKey, errorState} = useCustomProperties(getCustomProperties);

    const storageKey = useMemo(() => `mapView:${base.id}:${table.id}`, [base.id, table.id]);
    const {viewState, setViewState, savedViewRef, initialCameraAppliedRef} = useMapViewState(
        storageKey,
        DEFAULT_MAP_VIEW,
    );

    const [hoveredLocationId, setHoveredLocationId] = useState<string | null>(null);
    const [activeMenuLocationId, setActiveMenuLocationId] = useState<string | null>(null);
    const mapRef = useRef<MapRef | null>(null);
    const [isMapReady, setIsMapReady] = useState(false);

    // Extract individual field values to avoid object reference issues
    const mapboxApiKey = customPropertyValueByKey.mapboxApiKey as string;
    const labelField = customPropertyValueByKey.labelField as Field | undefined;
    const gpsField = customPropertyValueByKey.gpsField as Field | undefined;
    const autoCenterOnLoad = (customPropertyValueByKey.autoCenterOnLoad as boolean) ?? true;

    const isConfigured = Boolean(mapboxApiKey && labelField && gpsField);

    // Fields available for colorization
    const colorableFields = useMemo(() => {
        return table.fields.filter(
            (field) =>
                field.type === FieldType.SINGLE_SELECT ||
                field.type === FieldType.MULTIPLE_SELECTS ||
                field.type === FieldType.CHECKBOX ||
                field.type === FieldType.SINGLE_COLLABORATOR ||
                field.type === FieldType.FORMULA ||
                field.type === FieldType.CREATED_BY ||
                field.type === FieldType.LAST_MODIFIED_BY,
        );
    }, [table.fields]);

    // Color customization
    const {
        colorFieldId,
        colorConfiguration,
        showFieldModal,
        showColorModal,
        fieldSearchQuery,
        valueSearchQuery,
        uniqueValues,
        setShowFieldModal,
        setShowColorModal,
        setFieldSearchQuery,
        setValueSearchQuery,
        handleFieldSelect,
        handleColorChange,
        handleAutoAssignColors,
        handleRemoveField,
    } = useColorCustomization(base.id, table.id, records, colorableFields);

    const selectedColorField = colorFieldId
        ? colorableFields.find((f) => f.id === colorFieldId)
        : null;

    const locations = useGPSLocations({
        records,
        labelField,
        gpsField,
        isConfigured,
        colorField: selectedColorField,
        colorConfiguration,
    });

    // Color counters for display
    const colorCounters = useColorCounters(locations, colorFieldId);

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
    }, [activeMenuLocationId]);

    // Decide initial view once, preferring auto-fit when allowed, otherwise fallback to saved view.
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
        savedViewRef,
        initialCameraAppliedRef,
        setViewState,
    ]);

    // Handle marker click - toggle menu
    const handleMarkerClick = (location: LocationData, event: React.MouseEvent) => {
        event.stopPropagation();
        setActiveMenuLocationId((prev) => (prev === location.id ? null : location.id));
    };

    const handleZoomToLocation = (location: LocationData) => {
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
    };

    const handleShowDetails = (location: LocationData) => {
        const shouldExpandRecords = table.hasPermissionToExpandRecords();
        if (shouldExpandRecords) {
            expandRecord(location.record);
        }
        setActiveMenuLocationId(null);
    };

    const handleRecenter = () => {
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
    };

    if (!isConfigured) {
        return <ConfigurationScreen />;
    }

    if (errorState) {
        return (
            <div className="flex items-center justify-center h-screen bg-red-50 dark:bg-red-900 p-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-900 dark:text-red-100 mb-4">
                        Configuration Error
                    </h2>
                    <p className="text-red-700 dark:text-red-200">
                        {errorState.error?.message ||
                            'There was an error with the custom properties configuration.'}
                    </p>
                </div>
            </div>
        );
    }

    // Render the map - hide until initial camera is applied
    const hideMapUntilCameraReady = !initialCameraAppliedRef.current;
    return (
        <div className="w-full h-screen flex flex-col">
            {/* Customization Bar */}
            <ColorCustomizationBar
                activeColorField={selectedColorField || null}
                colorConfiguration={colorConfiguration}
                onOpenFieldModal={() => setShowFieldModal(true)}
                onOpenColorModal={() => setShowColorModal(true)}
            />

            {/* Color Field Selection Modal */}
            <ColorFieldSelectionModal
                isOpen={showFieldModal}
                searchQuery={fieldSearchQuery}
                fields={colorableFields}
                onClose={() => setShowFieldModal(false)}
                onSearchChange={setFieldSearchQuery}
                onFieldSelect={handleFieldSelect}
            />

            {/* Color Values Modal */}
            <ColorValuesModal
                isOpen={showColorModal}
                field={selectedColorField || null}
                searchQuery={valueSearchQuery}
                uniqueValues={uniqueValues}
                colorConfiguration={colorConfiguration}
                onClose={() => setShowColorModal(false)}
                onSearchChange={setValueSearchQuery}
                onColorChange={handleColorChange}
                onAutoAssignColors={handleAutoAssignColors}
                onRemoveField={handleRemoveField}
            />

            {/* Map Container */}
            <div className="flex-1 relative">
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
                onMove={(evt: ViewStateChangeEvent) => setViewState(evt.viewState)}
                ref={mapRef}
                onLoad={() => setIsMapReady(true)}
                mapboxAccessToken={mapboxApiKey}
                mapStyle={'mapbox://styles/mapbox/standard'}
                minZoom={MIN_ZOOM}
                maxZoom={MAX_ZOOM}
            >
                <NavigationControl />

                {locations.map((location) => (
                    <MapMarker
                        key={location.id}
                        location={location}
                        isHovered={hoveredLocationId === location.id}
                        hasActiveMenu={activeMenuLocationId === location.id}
                        onMarkerClick={(e) => handleMarkerClick(location, e)}
                        onMouseEnter={() => setHoveredLocationId(location.id)}
                        onMouseLeave={() =>
                            setHoveredLocationId((prev) => (prev === location.id ? null : prev))
                        }
                        onZoomToLocation={() => handleZoomToLocation(location)}
                        onShowDetails={() => handleShowDetails(location)}
                        hasPermissionToExpand={table.hasPermissionToExpandRecords()}
                    />
                ))}
                </MapBoxMap>

                <PointsCounter count={locations.length} colorCounters={colorCounters} />
                <RecenterButton onClick={handleRecenter} isVisible={locations.length > 0} />
            </div>
        </div>
    );
}

initializeBlock({interface: () => <MapExtensionApp />});
