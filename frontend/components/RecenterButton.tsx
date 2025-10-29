interface RecenterButtonProps {
    onClick: () => void;
    isVisible: boolean;
}

export function RecenterButton({onClick, isVisible}: RecenterButtonProps) {
    if (!isVisible) return null;

    return (
        <button
            onClick={onClick}
            className="absolute bottom-20 right-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 font-medium text-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 z-10"
            title="Recentrer la carte"
        >
            Recentrer
        </button>
    );
}

