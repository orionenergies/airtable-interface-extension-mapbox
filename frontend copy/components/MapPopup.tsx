import {Record, Field} from '@airtable/blocks/interface/models';
import {EyeIcon, MagnifyingGlassIcon, XIcon} from '@phosphor-icons/react';

interface MapPopupProps {
    record: Record;
    labelField: Field | undefined;
    position: {x: number; y: number};
    onViewRecord: (record: Record) => void;
    onZoomToLocation: (record: Record) => void;
    onClose: () => void;
}

export function MapPopup({record, labelField, position, onViewRecord, onZoomToLocation, onClose}: MapPopupProps) {
    // Obtenir le titre du point basé sur le champ labelField
    const pointTitle = labelField ? record.getCellValueAsString(labelField) : '';

    return (
        <>
            {/* Overlay pour fermer le popup */}
            <div 
                className="fixed inset-0 z-30"
                onClick={onClose}
            ></div>
            
            {/* Popup */}
            <div 
                className="absolute z-40 bg-white rounded-lg shadow-lg border border-gray-gray200 p-3 min-w-48 max-w-64"
                style={{
                    left: position.x,
                    top: position.y,
                    transform: 'translate(-50%, -100%)'
                }}
            >
                {/* En-tête avec titre du point et bouton fermer */}
                <div className="flex items-start justify-between mb-3">
                    {pointTitle && (
                        <div className="flex-1 pr-2">
                            <h3 className="text-xs font-medium text-gray-gray700 leading-tight line-clamp-2">
                                {pointTitle}
                            </h3>
                        </div>
                    )}
                    <button
                        onClick={onClose}
                        className="flex-shrink-0 text-gray-gray400 hover:text-gray-gray600 transition-colors"
                    >
                        <XIcon size={16} />
                    </button>
                </div>
                
                {/* Options */}
                <div className="space-y-1">
                    {/* Voir le détail */}
                    <button
                        onClick={() => {
                            onViewRecord(record);
                            onClose();
                        }}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-gray700 hover:bg-gray-gray25 rounded-sm transition-colors"
                    >
                        <EyeIcon size={16} className="text-gray-gray600" />
                        <span>Voir le détail</span>
                    </button>
                    
                    {/* Zoom sur le lieu */}
                    <button
                        onClick={() => {
                            onZoomToLocation(record);
                            onClose();
                        }}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-gray700 hover:bg-gray-gray25 rounded-sm transition-colors"
                    >
                        <MagnifyingGlassIcon size={16} className="text-gray-gray600" />
                        <span>Zoom sur le lieu</span>
                    </button>
                </div>
            </div>
        </>
    );
}
