import {MapTrifoldIcon} from '@phosphor-icons/react';
import {getRegionName} from '../utils/regionConfig';

interface GlobalViewButtonProps {
    regionFocus: string;
    onResetView: () => void;
}

export function GlobalViewButton({regionFocus, onResetView}: GlobalViewButtonProps) {
    const regionName = getRegionName(regionFocus);
    const buttonText = regionFocus === 'france' ? 'Vue globale' : regionName;
    
    return (
        <button
            onClick={onResetView}
            className="absolute bottom-10 right-5 z-20 bg-white hover:bg-gray-gray25 border border-gray-gray200 rounded-lg shadow-lg px-3 py-2 transition-all duration-200 hover:shadow-xl flex items-center space-x-2"
            title={buttonText}
        >
            <MapTrifoldIcon size={16} className="text-gray-gray700" />
            <span className="text-sm font-medium text-gray-gray700">{buttonText}</span>
        </button>
    );
}
