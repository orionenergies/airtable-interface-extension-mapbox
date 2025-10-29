import {colorUtils} from '@airtable/blocks/interface/ui';
import type {ColorCounter} from '../hooks/useColorCounters';

interface PointsCounterProps {
    count: number;
    colorCounters: ColorCounter[];
}

export function PointsCounter({count, colorCounters}: PointsCounterProps) {
    const formatNumber = (num: number): string => {
        return num.toLocaleString('fr-FR');
    };

    return (
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
            {/* Compteur total */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg px-4 py-2 border border-gray-200 dark:border-gray-700">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {formatNumber(count)} point{count > 1 ? 's' : ''} affiché{count > 1 ? 's' : ''}
                </span>
            </div>

            {/* Compteurs par couleur */}
            {colorCounters.length > 0 && (
                <div className="flex flex-col gap-1">
                    {colorCounters.map((counter) => {
                        const hexColor = colorUtils.getHexForColor(counter.color);
                        
                        return (
                            <div
                                key={counter.color}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg px-4 py-2 border border-gray-200 dark:border-gray-700"
                            >
                                <div className="flex items-center space-x-2">
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{backgroundColor: hexColor}}
                                    ></div>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {formatNumber(counter.count)} {counter.values.join(', ')}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

