import {useCallback} from 'react';
import {useCustomProperties} from '@airtable/blocks/interface/ui';
import {FieldType, Base, Field} from '@airtable/blocks/interface/models';

export function useCustomPropertiesConfig(base: Base) {
    const getCustomProperties = useCallback(() => {
        const table = base.tables[0];
        const textFieldTypes = [FieldType.SINGLE_LINE_TEXT, FieldType.MULTILINE_TEXT];
        const textFields = table.fields.filter(
            (field: Field) =>
                // Text fields
                textFieldTypes.includes(field.type) ||
                // Fields that produce a text value
                (field.config.options &&
                    'result' in field.config.options &&
                    field.config.options.result &&
                    textFieldTypes.includes(field.config.options.result.type)),
        );

        return [
            {
                key: 'mapboxApiKey',
                type: 'string' as const,
                label: 'Mapbox token (optionnel - pour styles personnalisés)',
                defaultValue: '',
            },
            {
                key: 'labelField',
                type: 'field' as const,
                label: 'Champ nom/label',
                table: table,
                possibleValues: textFields,
            },
            {
                key: 'coordinateField',
                type: 'field' as const,
                label: 'Champ coordonnées GPS',
                table: table,
                possibleValues: textFields,
            },
            {
                key: 'regionFocus',
                type: 'enum' as const,
                label: 'Zone géographique à afficher',
                possibleValues: [
                    {value: 'france', label: 'France entière'},
                    {value: 'ile-de-france', label: 'Île-de-France'},
                    {value: 'auvergne-rhone-alpes', label: 'Auvergne-Rhône-Alpes'},
                    {value: 'nouvelle-aquitaine', label: 'Nouvelle-Aquitaine'},
                    {value: 'occitanie', label: 'Occitanie'},
                    {value: 'hauts-de-france', label: 'Hauts-de-France'},
                    {value: 'grand-est', label: 'Grand Est'},
                    {value: 'bourgogne-franche-comte', label: 'Bourgogne-Franche-Comté'},
                    {value: 'centre-val-de-loire', label: 'Centre-Val de Loire'},
                    {value: 'normandie', label: 'Normandie'},
                    {value: 'bretagne', label: 'Bretagne'},
                    {value: 'pays-de-la-loire', label: 'Pays de la Loire'},
                    {value: 'provence-alpes-cote-azur', label: 'Provence-Alpes-Côte d\'Azur'},
                    {value: 'corse', label: 'Corse'},
                ],
                defaultValue: 'france',
            },
            {
                key: 'autoCenterOnLoad',
                type: 'boolean' as const,
                label: 'Centrage automatique de la carte',
                defaultValue: true,
            },
            {
                key: 'zoomToPinOnClick',
                type: 'boolean' as const,
                label: 'Zoom sur le point au clic',
                defaultValue: true,
            },
        ];
    }, [base.tables]);

    const {customPropertyValueByKey, errorState} = useCustomProperties(getCustomProperties);

    // Extract individual field values to avoid object reference issues
    const mapboxApiKey = customPropertyValueByKey.mapboxApiKey as string;
    const labelField = customPropertyValueByKey.labelField as Field | undefined;
    const coordinateField = customPropertyValueByKey.coordinateField as Field | undefined;
    const regionFocus = (customPropertyValueByKey.regionFocus as string) ?? 'france';
    const zoomToPinOnClick = (customPropertyValueByKey.zoomToPinOnClick as boolean) ?? true;
    const autoCenterOnLoad = (customPropertyValueByKey.autoCenterOnLoad as boolean) ?? true;

    // Check if required custom properties are configured
    const isConfigured = Boolean(labelField && coordinateField);

    return {
        mapboxApiKey,
        labelField,
        coordinateField,
        regionFocus,
        zoomToPinOnClick,
        autoCenterOnLoad,
        isConfigured,
        errorState,
    };
}
