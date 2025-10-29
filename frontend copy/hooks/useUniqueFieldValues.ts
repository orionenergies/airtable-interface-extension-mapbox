import {useMemo} from 'react';
import {Field, Record} from '@airtable/blocks/interface/models';

export function useUniqueFieldValues(field: Field | null, records: Record[] | null): string[] {
    return useMemo(() => {
        if (!field || !records) return [];
        
        const values = new Set<string>();
        records.forEach(record => {
            const value = record.getCellValueAsString(field);
            if (value && value.trim() !== '') {
                values.add(value);
            }
        });
        
        return Array.from(values).sort();
    }, [field, records]);
}
