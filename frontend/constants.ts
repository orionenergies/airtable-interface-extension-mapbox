export const DEFAULT_MAP_VIEW = {
    longitude: -74.5,
    latitude: 40,
    zoom: 9,
} as const;

export const MARKER_ZOOM_LEVEL = 14;
export const SINGLE_LOCATION_ZOOM = 12;
export const MIN_ZOOM = 1;
export const MAX_ZOOM = 18;
export const BOUNDS_PADDING = 80;

export const RECORD_DETAILS_PANEL_WIDTH = 700;

export const GPS_COORDINATE_LIMITS = {
    MIN_LAT: -90,
    MAX_LAT: 90,
    MIN_LNG: -180,
    MAX_LNG: 180,
} as const;

// Airtable color palette
export const AIRTABLE_COLORS = [
    'blue',
    'cyan',
    'teal',
    'green',
    'yellow',
    'orange',
    'red',
    'pink',
    'purple',
    'gray',
] as const;

export type AirtableColor = typeof AIRTABLE_COLORS[number];

export const DEFAULT_MARKER_COLOR: AirtableColor = 'red';

