import {useState, useCallback, useMemo} from 'react';
import {Field, Record} from '@airtable/blocks/interface/models';
import type {AirtableColor} from '../constants';
import {AIRTABLE_COLORS} from '../constants';

export function useColorCustomization(
    baseId: string,
    tableId: string,
    records: ReadonlyArray<Record>,
    colorableFields: ReadonlyArray<Field>,
) {
    // État pour le champ sélectionné
    const [colorFieldId, setColorFieldId] = useState<string | null>(() => {
        try {
            return localStorage.getItem(`colorFieldId:${baseId}:${tableId}`) || null;
        } catch {
            return null;
        }
    });

    // État pour la configuration des couleurs
    const [colorConfiguration, setColorConfiguration] = useState<Map<string, AirtableColor>>(() => {
        try {
            const saved = localStorage.getItem(`colorConfig:${baseId}:${tableId}`);
            if (saved) {
                const parsed = JSON.parse(saved);
                return new Map(parsed);
            }
        } catch {
            // Ignore
        }
        return new Map();
    });

    // État pour la visibilité des valeurs (par défaut toutes visibles)
    const [valueVisibility, setValueVisibility] = useState<Set<string>>(() => {
        try {
            const saved = localStorage.getItem(`valueVisibility:${baseId}:${tableId}`);
            if (saved) {
                const parsed = JSON.parse(saved) as string[];
                // Si toutes les valeurs sont masquées, on retourne un Set vide
                // Sinon on retourne les valeurs visibles
                return new Set(parsed);
            }
        } catch {
            // Ignore
        }
        // Par défaut, toutes les valeurs sont visibles (pas de Set = toutes visibles)
        return new Set();
    });

    // États pour les modals
    const [showFieldModal, setShowFieldModal] = useState(false);
    const [showColorModal, setShowColorModal] = useState(false);
    const [fieldSearchQuery, setFieldSearchQuery] = useState('');
    const [valueSearchQuery, setValueSearchQuery] = useState('');

    // Calculer les valeurs uniques pour le champ sélectionné
    const uniqueValues = useMemo(() => {
        if (!colorFieldId || !records.length) return [];

        const field = colorableFields.find((f) => f.id === colorFieldId);
        if (!field) return [];

        const valuesSet = new Set<string>();
        for (const record of records) {
            const value = record.getCellValueAsString(field);
            if (value) valuesSet.add(value);
        }

        return Array.from(valuesSet).sort();
    }, [colorFieldId, records, colorableFields]);

    // Sauvegarder le champ sélectionné
    const handleFieldSelect = useCallback(
        (field: Field) => {
            setColorFieldId(field.id);
            setShowFieldModal(false);
            setShowColorModal(true);

            try {
                localStorage.setItem(`colorFieldId:${baseId}:${tableId}`, field.id);
            } catch {
                // Ignore
            }
        },
        [baseId, tableId],
    );

    // Changer une couleur
    const handleColorChange = useCallback(
        (value: string, color: AirtableColor) => {
            setColorConfiguration((prev) => {
                const next = new Map(prev);
                next.set(value, color);

                try {
                    const serialized = JSON.stringify([...next.entries()]);
                    localStorage.setItem(`colorConfig:${baseId}:${tableId}`, serialized);
                } catch {
                    // Ignore
                }

                return next;
            });
        },
        [baseId, tableId],
    );

    // Auto-assigner des couleurs
    const handleAutoAssignColors = useCallback(() => {
        const newConfig = new Map<string, AirtableColor>();

        uniqueValues.forEach((value, index) => {
            const color = AIRTABLE_COLORS[index % AIRTABLE_COLORS.length];
            newConfig.set(value, color);
        });

        setColorConfiguration(newConfig);

        try {
            const serialized = JSON.stringify([...newConfig.entries()]);
            localStorage.setItem(`colorConfig:${baseId}:${tableId}`, serialized);
        } catch {
            // Ignore
        }
    }, [uniqueValues, baseId, tableId]);

    // Supprimer le champ de couleur
    const handleRemoveField = useCallback(() => {
        setColorFieldId(null);
        setColorConfiguration(new Map());
        setValueVisibility(new Set());
        setShowColorModal(false);

        try {
            localStorage.removeItem(`colorFieldId:${baseId}:${tableId}`);
            localStorage.removeItem(`colorConfig:${baseId}:${tableId}`);
            localStorage.removeItem(`valueVisibility:${baseId}:${tableId}`);
        } catch {
            // Ignore
        }
    }, [baseId, tableId]);

    // Toggle la visibilité d'une valeur
    const handleToggleValueVisibility = useCallback(
        (value: string) => {
            setValueVisibility((prev) => {
                const next = new Set(prev);
                // Si le Set est vide, toutes les valeurs sont visibles par défaut
                // On doit créer un Set avec toutes les valeurs sauf celle qu'on toggle
                if (next.size === 0) {
                    // Toutes étaient visibles, on masque cette valeur
                    // On stocke uniquement les valeurs VISIBLES, donc on ne met rien pour "toutes visibles"
                    // Mais pour masquer une valeur, on doit stocker toutes les autres comme visibles
                    const allValues = uniqueValues;
                    allValues.forEach((v) => {
                        if (v !== value) next.add(v);
                    });
                } else {
                    // Certaines valeurs sont masquées
                    if (next.has(value)) {
                        // Cette valeur est visible, on la masque
                        next.delete(value);
                        // Si plus aucune valeur n'est masquée (next est vide), on retourne un Set vide pour "toutes visibles"
                        if (next.size === uniqueValues.length - 1) {
                            // On a masqué la dernière valeur visible, donc toutes sont maintenant masquées
                            // On retourne un Set vide pour indiquer qu'aucune valeur n'est explicitement visible
                            return new Set();
                        }
                    } else {
                        // Cette valeur est masquée, on la rend visible
                        next.add(value);
                        // Si toutes les valeurs sont maintenant visibles
                        if (next.size === uniqueValues.length) {
                            // On retourne un Set vide pour indiquer "toutes visibles"
                            return new Set();
                        }
                    }
                }

                try {
                    const serialized = JSON.stringify([...next]);
                    localStorage.setItem(`valueVisibility:${baseId}:${tableId}`, serialized);
                } catch {
                    // Ignore
                }

                return next;
            });
        },
        [baseId, tableId, uniqueValues],
    );

    // Vérifier si une valeur est visible
    const isValueVisible = useCallback(
        (value: string) => {
            // Si le Set est vide, toutes les valeurs sont visibles par défaut
            if (valueVisibility.size === 0) return true;
            // Sinon, on vérifie si la valeur est dans le Set
            return valueVisibility.has(value);
        },
        [valueVisibility],
    );

    return {
        colorFieldId,
        colorConfiguration,
        valueVisibility,
        showFieldModal,
        showColorModal,
        fieldSearchQuery,
        valueSearchQuery,
        uniqueValues,
        setShowFieldModal,
        setShowColorModal,
        setFieldSearchQuery,
        setValueSearchQuery,
        handleFieldSelect,
        handleColorChange,
        handleAutoAssignColors,
        handleRemoveField,
        handleToggleValueVisibility,
        isValueVisible,
    };
}

