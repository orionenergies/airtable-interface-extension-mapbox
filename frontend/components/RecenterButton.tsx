import {CrosshairSimpleIcon} from '@phosphor-icons/react';

interface RecenterButtonProps {
    onClick: () => void;
    isVisible: boolean;
}

export function RecenterButton({onClick, isVisible}: RecenterButtonProps) {
    if (!isVisible) return null;

    return (
        <button
            onClick={onClick}
            className="group relative bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 font-medium text-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
        >
            <CrosshairSimpleIcon size={18} className="text-gray-700 dark:text-gray-200" />
            Recentrer
            {/* Tooltip */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap">
                <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-3 py-1.5 rounded-lg shadow-lg">
                    Recentrer la carte sur tous les points
                    <div className="absolute left-full top-1/2 -translate-y-1/2 -ml-1">
                        <div className="w-2 h-2 bg-gray-900 dark:bg-gray-100 rotate-45"></div>
                    </div>
                </div>
            </div>
        </button>
    );
}

