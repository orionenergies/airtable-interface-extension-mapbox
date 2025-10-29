import {Marker} from 'react-map-gl/mapbox';
import type {LocationData} from '../hooks/useLocationData';

interface MapMarkerProps {
    location: LocationData;
    markerColor: string;
    isHovered: boolean;
    isPopupOpen: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onClick: (event: React.MouseEvent) => void;
}

export function MapMarker({
    location,
    markerColor,
    isHovered,
    isPopupOpen,
    onMouseEnter,
    onMouseLeave,
    onClick,
}: MapMarkerProps) {
    return (
        <Marker
            longitude={location.lng}
            latitude={location.lat}
            style={{zIndex: isHovered ? 1000 : 1}}
        >
            <div
                className={`relative group cursor-pointer transform hover:scale-110 transition-transform ${isPopupOpen ? 'opacity-0 pointer-events-none' : ''}`}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <div className={`${markerColor} hover:opacity-80 w-6 h-6 rounded-full border-2 border-white shadow-lg relative transition-all duration-200`}>
                    <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-current hover:opacity-80`}></div>
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                    {location.name}
                </div>
            </div>
        </Marker>
    );
}

