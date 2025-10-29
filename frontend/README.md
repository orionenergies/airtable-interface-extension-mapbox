# Frontend Structure

This Interface Extension follows a modular architecture with clear separation of concerns.

## Directory Structure

```
frontend/
├── index.tsx                           # Main application component
├── types.ts                            # TypeScript interfaces and types
├── constants.ts                        # Application constants
├── components/                         # React components
│   ├── ConfigurationScreen.tsx         # Setup instructions screen
│   ├── MapMarker.tsx                   # Map marker with context menu
│   ├── PointsCounter.tsx               # Points counter with color breakdown
│   ├── RecenterButton.tsx              # Map recenter button
│   ├── ColorCustomizationBar.tsx       # Color customization bar
│   ├── ColorFieldSelectionModal.tsx    # Field selection modal
│   ├── ColorValuesModal.tsx            # Color values customization modal
│   ├── ColorPicker.tsx                 # Airtable color picker
│   └── index.ts                        # Component barrel exports
├── hooks/                              # Custom React hooks
│   ├── useMapViewState.ts              # Map view state management
│   ├── useGPSLocations.ts              # GPS coordinate parsing
│   ├── useColorCustomization.ts        # Color customization logic
│   ├── useColorCounters.ts             # Color counters calculation
│   └── index.ts                        # Hook barrel exports
└── utils/                              # Utility functions
    ├── gpsParser.ts                    # GPS coordinate parsing logic
    └── index.ts                        # Utility barrel exports
```

## Key Components

### index.tsx
Main application component that orchestrates the map interface extension. Handles:
- Airtable SDK integration
- Custom properties configuration
- Map initialization and state management
- User interactions coordination

### Components

#### ConfigurationScreen
Displays setup instructions when the extension is not yet configured.

#### MapMarker
Renders individual map markers with hover tooltips and context menus offering:
- Zoom to location
- Show record details (when permissions allow)

#### PointsCounter
Shows the count of displayed points in the top-left corner with:
- Total count of points
- Breakdown by color (when color customization is active)
- Color circles with counts and values (e.g., "15 En cours")

#### RecenterButton
Button to reset the map view to show all markers.

#### ColorCustomizationBar
Compact bar for managing marker color customization:
- "Add a field" button when no field is selected
- Field selector button showing current field and color count

#### ColorFieldSelectionModal
Modal for selecting which field to use for coloring:
- Search bar for filtering fields
- Icons showing field types
- Supports multiple field types:
  - Single Select / Multiple Selects
  - Checkbox
  - User / Created by / Last modified by
  - Formula

#### ColorValuesModal
Modal for customizing colors per value:
- Search bar for filtering values
- Auto-assign button for quick setup
- Color circles for each value
- Footer with counter and remove option

#### ColorPicker
Full-screen modal for selecting Airtable colors:
- 5×2 grid of official Airtable colors
- Checkmark on selected color
- Instant hex conversion via `colorUtils`

### Hooks

#### useMapViewState
Manages map view state (latitude, longitude, zoom) with localStorage persistence.

#### useGPSLocations
Parses GPS coordinates from Airtable records and returns valid location data. 
Supports dynamic coloring by accepting a color field and configuration.

#### useColorCustomization
Complete state management for color customization:
- Field selection with localStorage persistence
- Color configuration management
- Unique values calculation
- Modal states management
- All event handlers (field select, color change, auto-assign, remove)

#### useColorCounters
Calculates statistics for color-coded markers:
- Counts points per color
- Aggregates values per color
- Returns sorted array of counters
- Updates reactively with location changes

### Utils

#### gpsParser
Utility function to parse GPS coordinates from "latitude, longitude" string format with validation.

## Constants

All magic numbers are extracted to named constants in `constants.ts`:
- `DEFAULT_MAP_VIEW` - Default map center and zoom
- `MARKER_ZOOM_LEVEL` - Zoom level when focusing on a marker
- `SINGLE_LOCATION_ZOOM` - Zoom for single location view
- `MIN_ZOOM` / `MAX_ZOOM` - Map zoom constraints
- `BOUNDS_PADDING` - Padding for map bounds
- `RECORD_DETAILS_PANEL_WIDTH` - Width of record details panel
- `GPS_COORDINATE_LIMITS` - Valid coordinate ranges
- `AIRTABLE_COLORS` - Array of 10 official Airtable color names
- `DEFAULT_MARKER_COLOR` - Default color for unconfigured markers (red)

## Types

Core TypeScript interfaces in `types.ts`:
- `LocationData` - Represents a map location with coordinates, Airtable record, and optional color information
- `MapViewState` - Map view state (lat, lng, zoom)
- `GPSCoordinates` - Parsed GPS coordinates
- `ColorConfiguration` - Field ID and value-to-color mapping

Additional types:
- `AirtableColor` - Union type of 10 official Airtable color names
- `ColorCounter` - Statistics for color-coded points (from hooks)

## Best Practices Applied

- **Single Responsibility**: Each component/function has one clear purpose
- **DRY Principle**: Reusable logic extracted into hooks and utilities
- **Type Safety**: Full TypeScript typing throughout
- **Clean Code**: No magic numbers, meaningful names, clear structure
- **Separation of Concerns**: UI, logic, and data layers are separated

