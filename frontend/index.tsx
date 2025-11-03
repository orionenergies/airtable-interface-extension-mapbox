import {useCallback, useMemo, useRef, useState} from 'react';
import {initializeBlock, useBase, useRecords, useCustomProperties} from '@airtable/blocks/interface/ui';
import {FieldType, Field} from '@airtable/blocks/interface/models';
import MapBoxMap, {NavigationControl} from 'react-map-gl/mapbox';
import type {ViewStateChangeEvent, MapRef} from 'react-map-gl/mapbox';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './style.css';

import {DEFAULT_MAP_VIEW, MIN_ZOOM, MAX_ZOOM, DEFAULT_MARKER_COLOR} from './constants';
import {createCustomProperties} from './customProperties';
import {
    useMapViewState,
    useGPSLocations,
    useColorCustomization,
    useColorCounters,
    useMarkerCustomization,
    useMapInteractions,
    useMapHandlers,
    useInitialMapView,
} from './hooks';
import {
    ConfigurationScreen,
    PointsCounter,
    MapMarker,
    ColorFieldSelectionModal,
    ColorValuesModal,
    InfoIcon,
    InfoModal,
    MapConfigurationPanel,
    ColorConfigurationColumn,
    MapControlsGroup,
    RefreshButton,
} from './components';

function MapExtensionApp() {
    const base = useBase();
    const table = base.tables[0];
    const records = useRecords(table);

    // Custom properties configuration
    const getCustomProperties = useCallback(createCustomProperties, []);
    const {customPropertyValueByKey, errorState} = useCustomProperties(getCustomProperties);

    // Map view state
    const storageKey = useMemo(() => `mapView:${base.id}:${table.id}`, [base.id, table.id]);
    const {viewState, setViewState, savedViewRef, initialCameraAppliedRef} = useMapViewState(
        storageKey,
        DEFAULT_MAP_VIEW,
    );

    // Map reference and ready state
    const mapRef = useRef<MapRef | null>(null);
    const [isMapReady, setIsMapReady] = useState(false);
    const [mapRefreshKey, setMapRefreshKey] = useState(0);

    // Marker customization (size and icon type)
    const {markerSize, markerIconType, setMarkerSize, setMarkerIconType} = useMarkerCustomization(
        base.id,
        table.id,
    );

    // Map interactions (hover, menu, modal)
    const {
        hoveredLocationId,
        setHoveredLocationId,
        activeMenuLocationId,
        setActiveMenuLocationId,
        isInfoModalOpen,
        setIsInfoModalOpen,
    } = useMapInteractions(mapRef);

    // Extract individual field values to avoid object reference issues
    const mapboxApiKey = customPropertyValueByKey.mapboxApiKey as string;
    const labelField = customPropertyValueByKey.labelField as Field | undefined;
    const gpsField = customPropertyValueByKey.gpsField as Field | undefined;
    const autoCenterOnLoad = (customPropertyValueByKey.autoCenterOnLoad as boolean) ?? true;

    const isConfigured = Boolean(mapboxApiKey && labelField && gpsField);

    // Fields available for colorization
    // Exclude text and number fields that typically have too many unique values
    const colorableFields = useMemo(() => {
        return table.fields.filter(
            (field) => {
                // Exclude text fields (too many unique values)
                if (
                    field.type === FieldType.SINGLE_LINE_TEXT ||
                    field.type === FieldType.MULTILINE_TEXT ||
                    field.type === FieldType.URL ||
                    field.type === FieldType.EMAIL ||
                    field.type === FieldType.PHONE_NUMBER
                ) {
                    return false;
                }
                // Exclude number fields (too many unique values)
                if (
                    field.type === FieldType.NUMBER ||
                    field.type === FieldType.CURRENCY ||
                    field.type === FieldType.PERCENT ||
                    field.type === FieldType.AUTO_NUMBER
                ) {
                    return false;
                }
                // Exclude date/time fields (usually too many unique values)
                if (
                    field.type === FieldType.DATE ||
                    field.type === FieldType.DATE_TIME ||
                    field.type === FieldType.CREATED_TIME ||
                    field.type === FieldType.LAST_MODIFIED_TIME
                ) {
                    return false;
                }
                // Include all other field types
                return true;
            },
        );
    }, [table.fields]);

    // Color customization
    const {
        colorFieldId,
        colorConfiguration,
        valueVisibility,
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
        handleToggleValueVisibility,
        isValueVisible,
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
        valueVisibility,
    });

    // Color counters for display
    const colorCounters = useColorCounters(locations, colorFieldId);

    // Map handlers (marker click, zoom, show details, recenter)
    const {handleMarkerClick, handleZoomToLocation, handleShowDetails, handleRecenter} =
        useMapHandlers({
            mapRef,
            table,
            locations,
            setViewState,
            setActiveMenuLocationId,
        });

    // Initial map view positioning
    useInitialMapView({
        isConfigured,
        isMapReady,
        autoCenterOnLoad,
        locations,
        mapRef,
        savedViewRef,
        initialCameraAppliedRef,
        setViewState,
    });

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
            <MapConfigurationPanel>
                <ColorConfigurationColumn
                    activeColorField={selectedColorField || null}
                    colorConfiguration={colorConfiguration}
                    onOpenFieldModal={() => setShowFieldModal(true)}
                    onOpenColorModal={() => setShowColorModal(true)}
                    onRemoveField={handleRemoveField}
                />
            </MapConfigurationPanel>

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
                valueVisibility={valueVisibility}
                onClose={() => setShowColorModal(false)}
                onSearchChange={setValueSearchQuery}
                onColorChange={handleColorChange}
                onAutoAssignColors={handleAutoAssignColors}
                onRemoveField={handleRemoveField}
                onToggleValueVisibility={handleToggleValueVisibility}
                isValueVisible={isValueVisible}
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
                key={mapRefreshKey}
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
                        markerSize={markerSize}
                        markerIconType={markerIconType}
                    />
                ))}
            </MapBoxMap>

                <PointsCounter count={locations.length} colorCounters={colorCounters} />
                <InfoIcon onClick={() => setIsInfoModalOpen(true)} />
                <RefreshButton
                    onClick={() => {
                        setIsMapReady(false);
                        initialCameraAppliedRef.current = false;
                        setMapRefreshKey((prev) => prev + 1);
                    }}
                />
                {locations.length > 0 && (
                    <MapControlsGroup
                        onRecenter={handleRecenter}
                        isRecenterVisible={locations.length > 0}
                        markerSize={markerSize}
                        markerIconType={markerIconType}
                        markerColor={locations[0]?.color || DEFAULT_MARKER_COLOR}
                        onMarkerSizeChange={setMarkerSize}
                        onMarkerIconTypeChange={setMarkerIconType}
                    />
                )}
            </div>

            {/* Info Modal */}
            <InfoModal
                isOpen={isInfoModalOpen}
                onClose={() => setIsInfoModalOpen(false)}
                totalPoints={locations.length}
                hasColorCustomization={Boolean(selectedColorField)}
            />
        </div>
    );
}

initializeBlock({interface: () => <MapExtensionApp />});
