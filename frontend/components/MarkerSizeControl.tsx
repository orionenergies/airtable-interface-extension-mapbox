import {MagnifyingGlassMinusIcon, MagnifyingGlassPlusIcon} from '@phosphor-icons/react';

interface MarkerSizeControlProps {
    markerSize: number;
    onSizeChange: (size: number) => void;
}

const MIN_SIZE = 12;
const MAX_SIZE = 32;
export const DEFAULT_MARKER_SIZE = 24;

export function MarkerSizeControl({markerSize, onSizeChange}: MarkerSizeControlProps) {
    return (
        <div className="absolute bottom-20 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3 z-10 min-w-[200px]">
            <div className="flex items-center gap-3">
                <MagnifyingGlassMinusIcon 
                    size={16} 
                    className="text-gray-600 dark:text-gray-400 flex-shrink-0" 
                />
                <input
                    type="range"
                    min={MIN_SIZE}
                    max={MAX_SIZE}
                    value={markerSize}
                    onChange={(e) => onSizeChange(Number(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-500"
                    title={`Taille des marqueurs: ${markerSize}px`}
                    aria-label="Taille des marqueurs"
                />
                <MagnifyingGlassPlusIcon 
                    size={16} 
                    className="text-gray-600 dark:text-gray-400 flex-shrink-0" 
                />
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                {markerSize}px
            </div>
        </div>
    );
}

export {MIN_SIZE, MAX_SIZE};

