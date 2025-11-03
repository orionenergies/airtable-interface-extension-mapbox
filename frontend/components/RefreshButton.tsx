import {ArrowClockwiseIcon} from '@phosphor-icons/react';

interface RefreshButtonProps {
    onClick: () => void;
}

export function RefreshButton({onClick}: RefreshButtonProps) {
    return (
        <div className="absolute bottom-8 left-4 z-10">
            <button
                onClick={onClick}
                className="group relative bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 p-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                aria-label="Rafraîchir la carte"
            >
                <ArrowClockwiseIcon size={20} className="text-gray-700 dark:text-gray-200" />
                {/* Tooltip */}
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap">
                    <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-3 py-1.5 rounded-lg shadow-lg">
                        Rafraîchir la carte
                        <div className="absolute right-full top-1/2 -translate-y-1/2 -mr-1">
                            <div className="w-2 h-2 bg-gray-900 dark:bg-gray-100 rotate-45"></div>
                        </div>
                    </div>
                </div>
            </button>
        </div>
    );
}

