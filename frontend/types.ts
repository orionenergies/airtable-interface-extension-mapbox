import {Record} from '@airtable/blocks/interface/models';
import type {AirtableColor} from './constants';

export interface LocationData {
    id: string;
    name: string;
    address: string;
    lat: number | null;
    lng: number | null;
    geoCache: string | null;
    record: Record;
    color?: AirtableColor;
    colorFieldValue?: string;
}

export interface MapViewState {
    longitude: number;
    latitude: number;
    zoom: number;
}

export interface GPSCoordinates {
    lat: number;
    lng: number;
}

export interface ColorConfiguration {
    fieldId: string | null;
    valueColors: Map<string, AirtableColor>;
}

