import React, {useMemo, useRef} from 'react';
import {initializeBlock, useBase, useRecords} from '@airtable/blocks/interface/ui';
import 'mapbox-gl/dist/mapbox-gl.css';
import './style.css';

// Hooks
import {useCustomPropertiesConfig} from './hooks/useCustomPropertiesConfig';
import {useFilters} from './hooks/useFilters';
import {useLocationData} from './hooks/useLocationData';
import {useUniqueFieldValues} from './hooks/useUniqueFieldValues';
import {useColorCounters} from './hooks/useColorCounters';
import {useMapViewState} from './hooks/useMapViewState';
import {useMapInteractions} from './hooks/useMapInteractions';
import {useAutoCentering} from './hooks/useAutoCentering';

// Components
import {FilterBar} from './components/FilterBar';
import {FieldSelectionModal} from './components/FieldSelectionModal';
import {ValueSelectionModal} from './components/ValueSelectionModal';
import {MapContainer} from './components/MapContainer';
import {ConfigurationScreen} from './components/ConfigurationScreen';
import {ErrorScreen} from './components/ErrorScreen';

function MapExtensionApp() {
    const base = useBase();
    const table = base.tables[0];
    const records = useRecords(table);

    // Configuration des propriétés personnalisées
    const {
        mapboxApiKey,
        labelField,
        coordinateField,
        regionFocus,
        zoomToPinOnClick,
        autoCenterOnLoad,
        isConfigured,
        errorState,
    } = useCustomPropertiesConfig(base);

    // Gestion des filtres
    const {
        activeFilters,
        showFieldModal,
        fieldSearchQuery,
        showValueModal,
        selectedFieldForValues,
        valueSearchQuery,
        selectedValues,
        handleFieldSelect,
        openFieldModal,
        openFilterDropdown,
        toggleValueSelection,
        clearValueSelection,
        removeFilter,
        setValueColor,
        setCurrentFilterOperator,
        canCustomizeColors,
        getMarkerColor,
        recordMatchesFilters,
        colorFilterId,
        setShowFieldModal,
        setFieldSearchQuery,
        setShowValueModal,
        setValueSearchQuery,
    } = useFilters();

    // Données de localisation (filtrées selon les filtres actifs)
    const locations = useLocationData(
        records, 
        labelField, 
        coordinateField, 
        isConfigured,
        recordMatchesFilters
    );

    // Valeurs uniques pour le champ sélectionné
    const uniqueValues = useUniqueFieldValues(selectedFieldForValues, records);

    // Compteurs par couleur
    const colorCounters = useColorCounters(locations, colorFilterId, activeFilters);

    // Gestion de la vue de la carte
    const storageKey = useMemo(() => `mapView:${base.id}:${table.id}`, [base.id, table.id]);
    const {viewState, setViewState, savedViewRef, initialCameraAppliedRef} = useMapViewState(
        storageKey,
        {
            longitude: -74.5,
            latitude: 40,
            zoom: 4.7, // Zoom optimal pour voir la France entière
        },
    );

    // Gestion des interactions de la carte
    const mapRef = useRef(null);
    const {
        handleMarkerClick,
        popupData,
        handleViewRecord,
        handleZoomToLocation,
        closePopup,
        resetToGlobalView,
    } = useMapInteractions(table, zoomToPinOnClick, regionFocus, mapRef, setViewState);

    // État de chargement de la carte
    const [isMapReady, setIsMapReady] = React.useState(false);

    // Logique de centrage automatique
    useAutoCentering(
        isConfigured,
        isMapReady,
        autoCenterOnLoad,
        regionFocus,
        locations,
        mapRef,
        setViewState,
        savedViewRef,
        initialCameraAppliedRef
    );


    // Affichage de la configuration si non configuré
    if (!isConfigured) {
        return <ConfigurationScreen />;
    }

    // Affichage des erreurs
    if (errorState) {
        return <ErrorScreen errorMessage={errorState.error?.message} />;
    }

    const hideMapUntilCameraReady = !initialCameraAppliedRef.current;

    return (
        <div className="w-full h-screen flex flex-col">
            {/* Barre de filtres */}
            <FilterBar
                activeFilters={activeFilters}
                onRemoveFilter={removeFilter}
                onOpenFieldModal={openFieldModal}
                onOpenFilterDropdown={openFilterDropdown}
            />

            {/* Modal de sélection de champs */}
            <FieldSelectionModal
                isOpen={showFieldModal}
                searchQuery={fieldSearchQuery}
                fields={table.fields}
                onClose={() => setShowFieldModal(false)}
                onSearchChange={setFieldSearchQuery}
                onFieldSelect={handleFieldSelect}
            />

            {/* Modal de sélection de valeurs */}
            <ValueSelectionModal
                isOpen={showValueModal}
                field={selectedFieldForValues}
                searchQuery={valueSearchQuery}
                selectedValues={selectedValues}
                uniqueValues={uniqueValues}
                valueColors={
                    selectedFieldForValues 
                        ? (activeFilters.find(f => f.field.id === selectedFieldForValues.id)?.valueColors || {})
                        : {}
                }
                filterId={selectedFieldForValues?.id || ''}
                operator={
                    selectedFieldForValues 
                        ? (activeFilters.find(f => f.field.id === selectedFieldForValues.id)?.operator || 'is')
                        : 'is'
                }
                canCustomizeColors={selectedFieldForValues ? canCustomizeColors(selectedFieldForValues.id) : false}
                onClose={() => setShowValueModal(false)}
                onSearchChange={setValueSearchQuery}
                onToggleValue={toggleValueSelection}
                onClearSelection={clearValueSelection}
                onSetValueColor={setValueColor}
                onSetOperator={setCurrentFilterOperator}
            />

            {/* Carte */}
            <MapContainer
                viewState={viewState}
                onViewStateChange={setViewState}
                mapboxApiKey={mapboxApiKey}
                locations={locations}
                getMarkerColor={getMarkerColor}
                onMarkerClick={handleMarkerClick}
                onMapReady={() => setIsMapReady(true)}
                hideMapUntilCameraReady={hideMapUntilCameraReady}
                totalCount={locations.length}
                colorCounters={colorCounters}
                popupData={popupData}
                labelField={labelField}
                onViewRecord={handleViewRecord}
                onZoomToLocation={handleZoomToLocation}
                onClosePopup={closePopup}
                onResetToGlobalView={resetToGlobalView}
                regionFocus={regionFocus}
            />
        </div>
    );
}

initializeBlock({interface: () => <MapExtensionApp />});