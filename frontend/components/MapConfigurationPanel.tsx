import {useState, useEffect} from 'react';
import {CaretUpIcon, CaretDownIcon} from '@phosphor-icons/react';

export interface MapConfigurationPanelProps {
    children: React.ReactNode;
    storageKey?: string;
}

export function MapConfigurationPanel({
    children,
    storageKey = 'mapConfigPanelCollapsed',
}: MapConfigurationPanelProps) {
    const [isCollapsed, setIsCollapsed] = useState(() => {
        try {
            const saved = localStorage.getItem(storageKey);
            // Si rien n'est sauvegardé, le panneau est fermé par défaut
            return saved ? saved === 'true' : true;
        } catch {
            return true; // Fermé par défaut
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(storageKey, isCollapsed.toString());
        } catch {
            // Ignore
        }
    }, [isCollapsed, storageKey]);

    return (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            {/* Header with collapse button - entire header is clickable */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="w-full flex items-center justify-between px-4 py-2.5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                aria-label={isCollapsed ? 'Développer' : 'Replier'}
            >
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Configuration de la carte
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                    {isCollapsed ? (
                        <>
                            <CaretDownIcon size={16} />
                            <span>Développer</span>
                        </>
                    ) : (
                        <>
                            <CaretUpIcon size={16} />
                            <span>Replier</span>
                        </>
                    )}
                </div>
            </button>

            {/* Content */}
            {!isCollapsed && (
                <div className="p-4 bg-white dark:bg-gray-800">
                    <div className="flex flex-wrap gap-6">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
}

