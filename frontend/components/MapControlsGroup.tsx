import {RecenterButton} from './RecenterButton';
import {MarkerIconSelector} from './MarkerIconSelector';
import type {MarkerIconType} from './MarkerIconSelector';
import type {AirtableColor} from '../constants';

interface MapControlsGroupProps {
    onRecenter: () => void;
    isRecenterVisible: boolean;
    markerSize: number;
    markerIconType: MarkerIconType;
    markerColor: AirtableColor;
    onMarkerSizeChange: (size: number) => void;
    onMarkerIconTypeChange: (type: MarkerIconType) => void;
}

export function MapControlsGroup({
    onRecenter,
    isRecenterVisible,
    markerSize,
    markerIconType,
    markerColor,
    onMarkerSizeChange,
    onMarkerIconTypeChange,
}: MapControlsGroupProps) {
    if (!isRecenterVisible) return null;

    return (
        <div className="absolute bottom-16 right-4 z-10 flex flex-col items-end gap-3">
            {/* Icon Selector */}
            <MarkerIconSelector
                markerSize={markerSize}
                markerIconType={markerIconType}
                markerColor={markerColor}
                onSizeChange={onMarkerSizeChange}
                onIconTypeChange={onMarkerIconTypeChange}
            />

            {/* Recenter Button */}
            <RecenterButton onClick={onRecenter} isVisible={isRecenterVisible} />
        </div>
    );
}

