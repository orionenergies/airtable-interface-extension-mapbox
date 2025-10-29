import {GPS_COORDINATE_LIMITS} from '../constants';
import type {GPSCoordinates} from '../types';

/**
 * Parse GPS coordinates from string format: "latitude, longitude"
 * @param gpsString - String containing GPS coordinates
 * @returns Parsed coordinates or null if invalid
 */
export function parseGPSCoordinates(gpsString: string): GPSCoordinates | null {
    if (!gpsString) return null;

    const parts = gpsString.split(',').map((part) => part.trim());
    if (parts.length !== 2) return null;

    const lat = parseFloat(parts[0]);
    const lng = parseFloat(parts[1]);

    if (isNaN(lat) || isNaN(lng)) return null;

    if (
        lat < GPS_COORDINATE_LIMITS.MIN_LAT ||
        lat > GPS_COORDINATE_LIMITS.MAX_LAT ||
        lng < GPS_COORDINATE_LIMITS.MIN_LNG ||
        lng > GPS_COORDINATE_LIMITS.MAX_LNG
    ) {
        return null;
    }

    return {lat, lng};
}

