// SVG paths from Mapbox Maki icons (15x15 viewBox, scaled to 24x24)
const MAKI_SVG_PATHS: Record<string, string> = {
    marker: 'M7.5 1C5.42312 1 3 2.2883 3 5.56759C3 7.79276 6.46156 12.7117 7.5 14C8.42309 12.7117 12 7.90993 12 5.56759C12 2.2883 9.57688 1 7.5 1Z',
    circle: 'M14,7.5c0,3.5899-2.9101,6.5-6.5,6.5S1,11.0899,1,7.5S3.9101,1,7.5,1S14,3.9101,14,7.5z',
    triangle: 'm7.5385 1c-.2948 0-.4883.1772-.6154.3846l-5.8462 9.5385c-.0769.0769-.0769.2307-.0769.3846 0 .5385.3846.6923.6923.6923h11.6154c.3846 0 .6923-.1538.6923-.6923 0-.1538 0-.2308-.0769-.3846l-5.7693-9.5385c-.1258-.2081-.3656-.3846-.6153-.3846z',
};

export type MakiIconType = 'marker' | 'circle' | 'triangle';

export const MAKI_ICON_TYPES: Array<{type: MakiIconType; label: string}> = [
    {type: 'marker', label: 'Marqueur'},
    {type: 'circle', label: 'Cercle'},
    {type: 'triangle', label: 'Triangle'},
];

export const DEFAULT_MAKI_ICON_TYPE: MakiIconType = 'marker';

/**
 * Get SVG content for a Maki icon with custom color and white border
 */
export function getMakiIconSVG(iconType: MakiIconType, color: string, size: number = 24): string {
    const path = MAKI_SVG_PATHS[iconType] || MAKI_SVG_PATHS.marker;
    // Stroke width scales with icon size: ~1.5px at 24px, ~2px at 32px
    const strokeWidth = Math.max(1.2, (size / 24) * 1.2);
    
    // Maki icons use 15x15 viewBox - we'll use it directly and scale via width/height
    // Add white stroke for better visibility when markers overlap
    return `<svg width="${size}" height="${size}" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="${path}" fill="${color}" stroke="white" stroke-width="${strokeWidth.toFixed(2)}"/></svg>`;
}

/**
 * Convert Maki SVG to data URL for use in img src
 */
export function getMakiIconDataURL(iconType: MakiIconType, color: string, size: number = 24): string {
    const svg = getMakiIconSVG(iconType, color, size);
    const encoded = encodeURIComponent(svg);
    return `data:image/svg+xml,${encoded}`;
}

