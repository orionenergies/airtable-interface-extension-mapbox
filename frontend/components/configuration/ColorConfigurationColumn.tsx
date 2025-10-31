import {Field} from '@airtable/blocks/interface/models';
import {XIcon} from '@phosphor-icons/react';
import type {AirtableColor} from '../../constants';

export interface ColorConfigurationColumnProps {
    activeColorField: Field | null;
    colorConfiguration: Map<string, AirtableColor>;
    onOpenFieldModal: () => void;
    onOpenColorModal: () => void;
    onRemoveField: () => void;
}

export function ColorConfigurationColumn({
    activeColorField,
    colorConfiguration,
    onOpenFieldModal,
    onOpenColorModal,
    onRemoveField,
}: ColorConfigurationColumnProps) {
    const colorCount = colorConfiguration.size;

    return (
        <div className="flex-shrink-0 min-w-[220px] max-w-[280px] border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900/30">
            {/* Title */}
            <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300 text-center mb-1.5">
                Personnalisation des couleurs
            </h4>
            
            {/* Description */}
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-4 leading-relaxed">
                Choisissez un champ pour colorer les marqueurs selon leurs valeurs
            </p>
            
            {/* Options */}
            <div className="flex flex-col gap-2">
                {activeColorField ? (
                    <>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={onOpenColorModal}
                                className="flex items-center justify-between flex-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm"
                            >
                                <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                                    {activeColorField.name}
                                </span>
                                <svg
                                    className="w-3 h-3 text-gray-500 dark:text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRemoveField();
                                }}
                                className="flex items-center justify-center p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors group"
                                title="Supprimer le champ"
                                aria-label="Supprimer le champ"
                            >
                                <XIcon
                                    size={16}
                                    className="text-gray-400 dark:text-gray-500 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors"
                                />
                            </button>
                        </div>
                        {colorCount > 0 && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                {colorCount} valeur{colorCount > 1 ? 's' : ''} configurée{colorCount > 1 ? 's' : ''}
                            </div>
                        )}
                    </>
                ) : (
                    <button
                        onClick={onOpenFieldModal}
                        className="flex items-center justify-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition-colors text-sm font-medium shadow-sm w-full"
                    >
                        <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        <span>Choisir un champ</span>
                    </button>
                )}
            </div>
        </div>
    );
}

