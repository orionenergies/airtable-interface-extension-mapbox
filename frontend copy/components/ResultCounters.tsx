import type {ColorCounter} from '../hooks/useColorCounters';

interface ResultCountersProps {
    totalCount: number;
    colorCounters: ColorCounter[];
}

export function ResultCounters({totalCount, colorCounters}: ResultCountersProps) {
    const formatNumber = (num: number): string => {
        return num.toLocaleString('fr-FR');
    };

    return (
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
            {/* Compteur total */}
            <div className="bg-white rounded-lg shadow-lg px-4 py-2 border border-gray-gray200">
                <span className="text-sm font-medium text-gray-gray700">
                    {formatNumber(totalCount)} point{totalCount > 1 ? 's' : ''} affiché{totalCount > 1 ? 's' : ''}
                </span>
            </div>

            {/* Compteurs par couleur */}
            {colorCounters.length > 0 && (
                <div className="flex flex-col gap-1">
                    {colorCounters.map((counter) => (
                        <div
                            key={counter.colorId}
                            className="bg-white rounded-lg shadow-lg px-4 py-2 border border-gray-gray200"
                        >
                            <div className="flex items-center space-x-2">
                                <div className={`w-3 h-3 rounded-full ${counter.bgClass}`}></div>
                                <span className="text-sm font-medium text-gray-gray700">
                                    {formatNumber(counter.count)} {counter.values.join(', ')}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
