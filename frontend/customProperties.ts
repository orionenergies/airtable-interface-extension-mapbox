import {Base, Field} from '@airtable/blocks/interface/models';
import {FieldType} from '@airtable/blocks/interface/models';

/**
 * Create custom properties configuration for the map extension
 * This function defines all configurable properties for the extension
 */
export function createCustomProperties(base: Base) {
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
            label: 'Mapbox token',
            defaultValue: '',
        },
        {
            key: 'labelField',
            type: 'field' as const,
            label: 'Label field',
            table: table,
            possibleValues: textFields,
        },
        {
            key: 'gpsField',
            type: 'field' as const,
            label: 'GPS coordinates field',
            table: table,
            possibleValues: textFields,
        },
        {
            key: 'autoCenterOnLoad',
            type: 'boolean' as const,
            label: 'Automatically center map',
            defaultValue: true,
        },
    ];
}

