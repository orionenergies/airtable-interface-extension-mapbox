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
        setShowColorModal(false);

        try {
            localStorage.removeItem(`colorFieldId:${baseId}:${tableId}`);
            localStorage.removeItem(`colorConfig:${baseId}:${tableId}`);
        } catch {
            // Ignore
        }
    }, [baseId, tableId]);

    return {
        colorFieldId,
        colorConfiguration,
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
    };
}

