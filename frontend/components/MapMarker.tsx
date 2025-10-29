import {Marker} from 'react-map-gl/mapbox';
import {colorUtils} from '@airtable/blocks/interface/ui';
import type {LocationData} from '../types';
import {DEFAULT_MARKER_COLOR} from '../constants';

interface MapMarkerProps {
    location: LocationData;
    isHovered: boolean;
    hasActiveMenu: boolean;
    onMarkerClick: (event: React.MouseEvent) => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onZoomToLocation: () => void;
    onShowDetails: () => void;
    hasPermissionToExpand: boolean;
}

export function MapMarker({
    location,
    isHovered,
    hasActiveMenu,
    onMarkerClick,
    onMouseEnter,
    onMouseLeave,
    onZoomToLocation,
    onShowDetails,
    hasPermissionToExpand,
}: MapMarkerProps) {
    const markerColor = location.color || DEFAULT_MARKER_COLOR;
    const markerColorHex = colorUtils.getHexForColor(markerColor);
    
    return (
        <Marker
            longitude={location.lng!}
            latitude={location.lat!}
            style={{zIndex: isHovered || hasActiveMenu ? 1000 : 1}}
        >
            <div className="relative">
                <div
                    className="relative group cursor-pointer transform hover:scale-110 transition-transform"
                    onClick={onMarkerClick}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                >
                    <div 
                        className="w-6 h-6 rounded-full border-2 border-white shadow-lg relative transition-all"
                        style={{backgroundColor: markerColorHex}}
                    >
                        <div 
                            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent transition-all"
                            style={{borderTopColor: markerColorHex}}
                        ></div>
                    </div>
                    {!hasActiveMenu && (
                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                            {location.name}
                        </div>
                    )}
                </div>

                {hasActiveMenu && (
                    <MarkerMenu
                        locationName={location.name}
                        onZoomToLocation={onZoomToLocation}
                        onShowDetails={onShowDetails}
                        hasPermissionToExpand={hasPermissionToExpand}
                    />
                )}
            </div>
        </Marker>
    );
}

interface MarkerMenuProps {
    locationName: string;
    onZoomToLocation: () => void;
    onShowDetails: () => void;
    hasPermissionToExpand: boolean;
}

function MarkerMenu({
    locationName,
    onZoomToLocation,
    onShowDetails,
    hasPermissionToExpand,
}: MarkerMenuProps) {
    return (
        <div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden min-w-[180px] z-30"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                    {locationName}
                </div>
            </div>
            <div className="py-1">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onZoomToLocation();
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                >
                    <span>🔍</span>
                    <span>Zoomer sur le lieu</span>
                </button>
                {hasPermissionToExpand && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onShowDetails();
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                    >
                        <span>📋</span>
                        <span>Afficher le détail</span>
                    </button>
                )}
            </div>
        </div>
    );
}

