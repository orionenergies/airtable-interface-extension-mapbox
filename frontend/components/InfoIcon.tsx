import {InfoIcon as InfoIconPhosphor} from '@phosphor-icons/react';

interface InfoIconProps {
    onClick: () => void;
}

export function InfoIcon({onClick}: InfoIconProps) {
    return (
        <div className="absolute top-3 right-12 z-20">
            <button
                onClick={onClick}
                className="group relative flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                title="Cliquer pour ouvrir la fenêtre d'information"
                aria-label="Ouvrir les informations sur l'utilisation de la carte"
            >
                <InfoIconPhosphor
                    size={20}
                    className="text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300"
                    weight="fill"
                />
                {/* Tooltip */}
                <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap">
                    <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-3 py-1.5 rounded-lg shadow-lg">
                        Cliquer pour ouvrir la fenêtre d'information
                        <div className="absolute left-full top-1/2 -translate-y-1/2 -ml-1">
                            <div className="w-2 h-2 bg-gray-900 dark:bg-gray-100 rotate-45"></div>
                        </div>
                    </div>
                </div>
            </button>
        </div>
    );
}

