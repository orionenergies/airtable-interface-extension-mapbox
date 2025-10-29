# Architecture Overview

## Component Hierarchy

```
MapExtensionApp (index.tsx)
├── ConfigurationScreen          [shown when not configured]
│   └── Setup instructions & links
│
├── Error Screen                 [shown on error]
│   └── Error message display
│
└── Map View                     [main interface]
    ├── MapBoxMap
    │   ├── NavigationControl
    │   └── MapMarker (for each location)
    │       ├── Marker pin visual
    │       ├── Tooltip (on hover)
    │       └── MarkerMenu (on click)
    │           ├── Zoom button
    │           └── Details button
    │
    ├── PointsCounter
    │   └── "X points affichés"
    │
    └── RecenterButton
        └── "Recentrer"
```

## Data Flow

```
Airtable Records
      ↓
useRecords(table)
      ↓
useGPSLocations hook
      ↓ (parses GPS strings)
parseGPSCoordinates util
      ↓ (validates & filters)
LocationData[]
      ↓
MapExtensionApp state
      ↓
MapMarker components
```

## State Management

### Local Component State
```typescript
MapExtensionApp
├── hoveredLocationId: string | null      // Marker hover state
├── activeMenuLocationId: string | null   // Context menu visibility
├── isMapReady: boolean                   // Map loaded state
└── viewState: MapViewState               // Map camera position
    ├── latitude: number
    ├── longitude: number
    └── zoom: number
```

### Custom Properties (Airtable Configuration)
```typescript
Configuration
├── mapboxApiKey: string          // Mapbox token
├── labelField: Field             // Name field
├── gpsField: Field               // GPS coordinates field
└── autoCenterOnLoad: boolean     // Auto-fit on load
```

### Persistent State (localStorage)
```typescript
localStorage
└── `mapView:${baseId}:${tableId}`: MapViewState
```

## Hook Dependencies

### useMapViewState
**Input:**
- `storageKey`: string
- `defaultState`: MapViewState

**Output:**
- `viewState`: MapViewState
- `setViewState`: Setter
- `savedViewRef`: Ref to saved view
- `initialCameraAppliedRef`: Ref to init flag

**Side Effects:**
- Reads from localStorage on mount
- Writes to localStorage on state change

### useGPSLocations
**Input:**
- `records`: Record[]
- `labelField`: Field
- `gpsField`: Field
- `isConfigured`: boolean

**Output:**
- `locations`: LocationData[]

**Dependencies:**
- `parseGPSCoordinates` utility

**Optimization:**
- Memoizes based on record hash
- Returns stable array reference

## Event Handlers

### User Interactions
```
Click on Marker
      ↓
handleMarkerClick()
      ↓
Toggle activeMenuLocationId
      ↓
Show/Hide Context Menu

Menu: "Zoomer sur le lieu"
      ↓
handleZoomToLocation()
      ↓
mapInstance.flyTo()

Menu: "Afficher le détail"
      ↓
handleShowDetails()
      ↓
├── mapInstance.flyTo() (with offset)
└── expandRecord()

Click on "Recentrer"
      ↓
handleRecenter()
      ↓
Calculate bounds or single location
      ↓
mapInstance.flyTo()

Hover Marker
      ↓
setHoveredLocationId()
      ↓
Show tooltip
```

## File Responsibilities

### Core Logic
- **index.tsx**: Application orchestration, Airtable integration
- **types.ts**: Type definitions
- **constants.ts**: Configuration values

### Components (Pure UI)
- **ConfigurationScreen**: Setup instructions
- **MapMarker**: Pin rendering, menu, tooltip
- **PointsCounter**: Counter display
- **RecenterButton**: Reset button

### Hooks (Stateful Logic)
- **useMapViewState**: View state + persistence
- **useGPSLocations**: Data parsing + memoization

### Utils (Pure Functions)
- **gpsParser**: String → Coordinates conversion

## API Integration

### Airtable SDK
```typescript
// Read data
useBase()           → Base
useRecords(table)   → Record[]
useCustomProperties → Properties

// Write data
expandRecord(record) → Opens detail view

// Permissions
table.hasPermissionToExpandRecords() → boolean
```

### Mapbox GL
```typescript
// Map instance
mapRef.current.getMap() → MapboxMap

// Camera control
mapInstance.flyTo({
    center: [lng, lat],
    zoom: number,
    offset?: [x, y]
})

// Bounds calculation
mapInstance.cameraForBounds(bounds, {padding})
```

## Performance Optimizations

### Memoization
- `useMemo` for storage key
- `useMemo` for records hash (in useGPSLocations)
- `useCallback` for custom properties function

### Stable References
- `useRef` for stable data array
- `useRef` for map instance
- `useRef` for initialization flags

### Efficient Updates
- Hash-based change detection
- Conditional rendering
- Proper React keys

## Error Handling

### Configuration Errors
- Missing Mapbox API key
- Missing field selections
- Display ConfigurationScreen

### Custom Property Errors
- errorState from useCustomProperties
- Display error screen with message

### GPS Parsing Errors
- Invalid coordinate format
- Out-of-range coordinates
- Return null, filter out invalid locations

### Runtime Errors
- Safe optional chaining (`?.`)
- Try-catch for localStorage
- Null checks before operations

## Styling Strategy

### Tailwind Utility Classes
- Component-level styling
- Responsive design built-in
- Dark mode support (`dark:` prefix)

### Color Scheme
- Light mode: white, gray-50, gray-100
- Dark mode: gray-800, gray-900
- Accents: red-500 (markers), blue-600 (loading)

### Layout
- Absolute positioning for overlays
- Flexbox for internal layouts
- Z-index management for layering

## Future Extension Points

### Easy to Add
1. **New map controls**: Add component to map view
2. **New custom properties**: Add to getCustomProperties
3. **New marker styles**: Modify MapMarker component
4. **New data sources**: Create new hook

### Recommended Additions
1. **Error boundaries**: Wrap main component
2. **Loading states**: Add to data fetching
3. **Offline support**: Cache in localStorage
4. **Analytics**: Add tracking hooks
5. **Tests**: Unit tests for utils/hooks

## Build Process

### Development
```bash
# Type checking
npm run typecheck

# Linting
npm run lint
```

### Technologies
- **TypeScript**: Type safety
- **React 19**: UI framework
- **Tailwind CSS**: Styling
- **Mapbox GL**: Map rendering
- **Babel**: Transpilation
- **ESLint**: Code quality

## Compliance

This architecture adheres to:
- ✅ Airtable Interface Extensions API
- ✅ React best practices
- ✅ TypeScript conventions
- ✅ Clean Code principles
- ✅ Separation of concerns
- ✅ SOLID principles

See `COMPLIANCE.md` for detailed checklist.

