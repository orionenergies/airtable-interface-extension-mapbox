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
            className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 font-medium text-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
            title="Recentrer la carte"
        >
            <CrosshairSimpleIcon size={18} className="text-gray-700 dark:text-gray-200" />
            Recentrer
        </button>
    );
}

