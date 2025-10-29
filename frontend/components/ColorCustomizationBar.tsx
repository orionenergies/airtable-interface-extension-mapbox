import {Field} from '@airtable/blocks/interface/models';
import type {AirtableColor} from '../constants';

interface ColorCustomizationBarProps {
    activeColorField: Field | null;
    colorConfiguration: Map<string, AirtableColor>;
    onOpenFieldModal: () => void;
    onOpenColorModal: () => void;
}

export function ColorCustomizationBar({
    activeColorField,
    colorConfiguration,
    onOpenFieldModal,
    onOpenColorModal,
}: ColorCustomizationBarProps) {
    const colorCount = colorConfiguration.size;

    return (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-3">
            <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Couleur par:
                </span>

                {activeColorField ? (
                    <button
                        onClick={onOpenColorModal}
                        className="flex items-center bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm"
                    >
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                            {activeColorField.name}
                        </span>
                        <svg
                            className="ml-2 w-3 h-3 text-gray-500 dark:text-gray-400"
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
                ) : (
                    <button
                        onClick={onOpenFieldModal}
                        className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg transition-colors text-sm font-medium shadow-sm"
                    >
                        <svg
                            className="w-3 h-3"
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

