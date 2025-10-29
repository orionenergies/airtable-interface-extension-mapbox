export interface RegionConfig {
    center: [number, number]; // [longitude, latitude]
    zoom: number;
    bounds?: [[number, number], [number, number]]; // [[minLng, minLat], [maxLng, maxLat]]
}

export const REGION_CONFIGS: Record<string, RegionConfig> = {
    'france': {
        center: [2.3522, 46.6034],
        zoom: 4.7,
        bounds: [[-5.0, 41.0], [9.5, 51.0]]
    },
    'ile-de-france': {
        center: [2.3522, 48.8566],
        zoom: 8.5,
        bounds: [[1.39, 48.03], [3.37, 49.5]]
    },
    'auvergne-rhone-alpes': {
        center: [4.5, 45.5],
        zoom: 7.0,
        bounds: [[2.0, 44.0], [7.0, 47.0]]
    },
    'nouvelle-aquitaine': {
        center: [0.0, 45.0],
        zoom: 6.5,
        bounds: [[-2.0, 43.0], [2.0, 47.0]]
    },
    'occitanie': {
        center: [2.0, 43.5],
        zoom: 7.0,
        bounds: [[-0.5, 42.0], [4.5, 45.0]]
    },
    'hauts-de-france': {
        center: [3.0, 50.25],
        zoom: 7.5,
        bounds: [[1.5, 49.5], [4.5, 51.0]]
    },
    'grand-est': {
        center: [6.25, 48.75],
        zoom: 7.0,
        bounds: [[4.5, 47.5], [8.0, 50.0]]
    },
    'bourgogne-franche-comte': {
        center: [4.5, 47.0],
        zoom: 7.5,
        bounds: [[3.0, 46.0], [6.0, 48.0]]
    },
    'centre-val-de-loire': {
        center: [2.0, 47.5],
        zoom: 8.0,
        bounds: [[0.5, 46.5], [3.5, 48.5]]
    },
    'normandie': {
        center: [0.0, 49.25],
        zoom: 7.5,
        bounds: [[-1.5, 48.5], [1.5, 50.0]]
    },
    'bretagne': {
        center: [-3.25, 48.0],
        zoom: 7.5,
        bounds: [[-5.0, 47.0], [-1.5, 49.0]]
    },
    'pays-de-la-loire': {
        center: [-1.0, 47.0],
        zoom: 7.5,
        bounds: [[-2.0, 46.0], [0.5, 48.0]]
    },
    'provence-alpes-cote-azur': {
        center: [5.75, 44.0],
        zoom: 7.0,
        bounds: [[4.0, 43.0], [7.5, 45.0]]
    },
    'corse': {
        center: [9.0, 42.0],
        zoom: 8.5,
        bounds: [[8.5, 41.0], [9.5, 43.0]]
    }
};

export function getRegionConfig(regionKey: string): RegionConfig {
    return REGION_CONFIGS[regionKey] || REGION_CONFIGS['france'];
}

export function getRegionName(regionKey: string): string {
    const regionNames: Record<string, string> = {
        'france': 'France entière',
        'ile-de-france': 'Île-de-France',
        'auvergne-rhone-alpes': 'Auvergne-Rhône-Alpes',
        'nouvelle-aquitaine': 'Nouvelle-Aquitaine',
        'occitanie': 'Occitanie',
        'hauts-de-france': 'Hauts-de-France',
        'grand-est': 'Grand Est',
        'bourgogne-franche-comte': 'Bourgogne-Franche-Comté',
        'centre-val-de-loire': 'Centre-Val de Loire',
        'normandie': 'Normandie',
        'bretagne': 'Bretagne',
        'pays-de-la-loire': 'Pays de la Loire',
        'provence-alpes-cote-azur': 'Provence-Alpes-Côte d\'Azur',
        'corse': 'Corse'
    };
    return regionNames[regionKey] || 'France entière';
}


