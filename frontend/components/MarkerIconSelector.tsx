import {useState, useRef, useEffect} from 'react';
import {colorUtils} from '@airtable/blocks/interface/ui';
import type {AirtableColor} from '../constants';
import {DEFAULT_MARKER_COLOR} from '../constants';
import {
    MAKI_ICON_TYPES,
    DEFAULT_MAKI_ICON_TYPE,
    type MakiIconType,
    getMakiIconDataURL,
} from '../utils/makiIcons';

export type MarkerIconType = MakiIconType;

export const MARKER_ICON_TYPES = MAKI_ICON_TYPES.map((item) => ({
    type: item.type as MarkerIconType,
    label: item.label,
}));

export const DEFAULT_MARKER_ICON_TYPE: MarkerIconType = DEFAULT_MAKI_ICON_TYPE;

interface MarkerIconSelectorProps {
    markerSize: number;
    markerIconType: MarkerIconType;
    markerColor: AirtableColor;
    onSizeChange: (size: number) => void;
    onIconTypeChange: (type: MarkerIconType) => void;
}

export function MarkerIconSelector({
    markerSize,
    markerIconType,
    markerColor,
    onSizeChange,
    onIconTypeChange,
}: MarkerIconSelectorProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const markerColorHex = colorUtils.getHexForColor(markerColor);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isDropdownOpen]);

    // Render preview icon using Maki SVG
    const renderPreviewIcon = () => {
        const previewSize = 24;
        const iconDataURL = getMakiIconDataURL(markerIconType, markerColorHex, previewSize);
        
        return (
            <img
                src={iconDataURL}
                alt={MARKER_ICON_TYPES.find((item) => item.type === markerIconType)?.label || 'Marqueur'}
                width={previewSize}
                height={previewSize}
                style={{display: 'block'}}
            />
        );
    };

    return (
        <div className="flex flex-col items-center gap-3" ref={dropdownRef}>
            {/* Icon Selector Button */}
            <div className="relative">
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 flex items-center justify-center"
                    title="Changer l'icône du marqueur"
                    aria-label="Changer l'icône du marqueur"
                >
                    {renderPreviewIcon()}
                </button>

                {/* Dropdown */}
                {isDropdownOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-20"
                            onClick={() => setIsDropdownOpen(false)}
                        ></div>
                        <div className="absolute bottom-full mb-2 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-30 min-w-[120px]">
                            {MARKER_ICON_TYPES.map(({type, label}) => {
                                const iconDataURL = getMakiIconDataURL(type, markerColorHex, 18);
                                return (
                                    <button
                                        key={type}
                                        onClick={() => {
                                            onIconTypeChange(type);
                                            setIsDropdownOpen(false);
                                        }}
                                        className={`w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-sm transition-colors ${
                                            type === markerIconType
                                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                                                : 'text-gray-700 dark:text-gray-200'
                                        }`}
                                    >
                                        <img
                                            src={iconDataURL}
                                            alt={label}
                                            width={18}
                                            height={18}
                                            style={{display: 'block', flexShrink: 0}}
                                        />
                                        <span>{label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>

            {/* Vertical Slider */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2">
                <input
                    type="range"
                    min={12}
                    max={32}
                    value={markerSize}
                    onChange={(e) => onSizeChange(Number(e.target.value))}
                    className="marker-size-slider-vertical w-2 h-32 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-500"
                    title={`Taille des marqueurs: ${markerSize}px`}
                    aria-label="Taille des marqueurs"
                />
            </div>
        </div>
    );
}

