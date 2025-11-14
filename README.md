# Airtable Interface Extension - Mapbox

This Airtable Interface Extension displays your records on a fullscreen interactive map using Mapbox with GPS coordinates. Perfect for visualizing project locations, site visits, or any data with geographic coordinates.

📦 **Repository**: [orionenergies/airtable-interface-extension-mapbox](https://github.com/orionenergies/airtable-interface-extension-mapbox)

## 📑 Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Development](#development)
  - [Prerequisites](#prerequisites)
  - [Installation Steps](#installation-steps)
  - [Development with Block SDK](#development-with-block-sdk)
  - [Available Scripts](#available-scripts)
  - [Deploying to Airtable](#deploying-to-airtable)
- [Architecture & Project Organization](#architecture--project-organization)
  - [Project Structure](#project-structure)
  - [Component Architecture](#component-architecture)
  - [Hooks Architecture](#hooks-architecture)
  - [Data Flow](#data-flow)
- [Setup](#setup)
- [How It Works](#how-it-works)
- [Permissions](#permissions)
- [Troubleshooting](#troubleshooting)
- [Technical Details](#technical-details)

## Features

### Core Mapping
-   **Fullscreen map**: Renders a fullscreen map with pins for each record containing GPS coordinates
-   **GPS coordinate parsing**: Directly uses GPS coordinates in "latitude, longitude" format
-   **Saved view state**: Remembers your last map position/zoom per base/table in localStorage
-   **Auto-centering**: Automatically fits the map to show all your points on first load
-   **Recenter button**: One-click button to reset the view and see all your points
-   **Dark mode support**: Automatically switches map style based on system theme
-   **Real-time updates**: Map updates automatically when records change

### Interactive Markers
-   **Context menu**: Click any marker to access:
    -   🔍 **Zoom to location**: Focus on a specific point
    -   📋 **Show details**: Open the full record detail panel (when permitted)
-   **Hover tooltips**: See location names on hover
-   **Customizable markers**: Choose from 3 icon styles (pin, circle, triangle)
-   **Adjustable size**: Vertical slider to control marker size
-   **White borders**: Markers have white borders for better visibility when overlapping
-   **Dynamic colors**: Color-code your markers based on field values

### Visual Customization
-   **Configuration panel**: Collapsible panel at the top for easy access to customization options
-   **Color by field**: Assign colors to markers based on various field types
-   **Color picker**: Choose from 10 official Airtable colors for each value
-   **Auto-assign colors**: Quick setup with automatic color distribution
-   **Visibility toggle**: Show/hide markers by value with a simple eye icon
-   **Easy removal**: Remove color customization with one click
-   **Smart counters**: See total points and breakdown by color/value in real-time

### Supported Field Types for Colors
-   Single Select / Multiple Selects
-   Checkbox (Yes/No)
-   User / Created by / Last modified by
-   Formula (text values)
-   Button, Barcode, Rating, and other non-text/number fields

### User Experience
-   **Points counter**: Always know how many locations are displayed
-   **Color statistics**: See count per value (e.g., "15 En cours", "12 Annulé")
-   **Search & filter**: Native Airtable filters work seamlessly
-   **Airtable-like UI**: Familiar modal-based interface for customization
-   **Info modal**: Built-in help with usage instructions and support information
-   **Persistent preferences**: All customization settings saved locally

## Installation

### Prerequisites

Before installing the project, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher) or **yarn**
- **Git** (for cloning the repository)
- An **Airtable account** with access to Interface Extensions
- A **Mapbox account** (free tier is sufficient)

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/orionenergies/airtable-interface-extension-mapbox.git
   cd airtable-interface-extension-mapbox
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   
   If you encounter peer dependency issues with React 19, use:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Verify installation**:
   ```bash
   npm run typecheck
   npm run lint
   ```

## Development

### Development with Block SDK

This project uses the **Airtable Blocks SDK** (Interface Extensions) for development. The SDK provides hooks and utilities to interact with Airtable data and UI.

#### Key SDK Imports

The extension uses two main import paths:

```typescript
// UI hooks and functions
import {
  initializeBlock,
  useBase,
  useRecords,
  useCustomProperties,
  useColorScheme,
  expandRecord
} from '@airtable/blocks/interface/ui';

// Field types and models
import { FieldType } from '@airtable/blocks/interface/models';
```

#### Entry Point

The main entry point is `frontend/index.tsx`, which must conclude with:

```typescript
initializeBlock({ interface: () => <MapExtensionApp /> });
```

#### Development Workflow

1. **Start development**:
   - The Airtable Blocks SDK uses webpack bundling via `@airtable/blocks-webpack-bundler`
   - Development is done through Airtable's Interface Extension development environment
   - No local dev server is needed - the extension runs directly in Airtable

2. **Code Structure**:
   - All frontend code is in the `frontend/` directory
   - Components are in `frontend/components/`
   - Custom hooks are in `frontend/hooks/`
   - Utilities are in `frontend/utils/`
   - TypeScript types are in `frontend/types.ts`

3. **Type Checking**:
   ```bash
   npm run typecheck
   ```

4. **Linting**:
   ```bash
   npm run lint
   ```

### Available Scripts

- **`npm run lint`**: Run ESLint on all TypeScript/JavaScript files in the `frontend/` directory
- **`npm run typecheck`**: Run TypeScript compiler to check for type errors without emitting files

### Deploying to Airtable

To deploy your extension to Airtable:

1. **Build the extension**:
   The Airtable Blocks SDK automatically handles bundling when you upload the extension. However, you can verify your code is ready by running:
   ```bash
   npm run typecheck
   npm run lint
   ```

2. **Package the extension**:
   - Ensure all your code is committed and ready
   - The extension is packaged as a directory containing:
     - `block.json` - Extension configuration
     - `frontend/` - All frontend source code
     - `package.json` - Dependencies (for reference)

3. **Upload to Airtable**:
   - Go to your Airtable base
   - Navigate to **Extensions** → **Build a custom extension**
   - Select **Interface Extension**
   - Upload your extension directory or connect via CLI (if available)
   - Configure custom properties in the Interface Extension settings

4. **Using Airtable CLI** (if configured):
   ```bash
   # If you have Airtable CLI installed
   airtable blocks:deploy
   ```

   **Note**: The exact CLI command may vary. Check Airtable's latest documentation for Interface Extension deployment methods.

5. **Verify deployment**:
   - Add the extension to an Interface page
   - Configure custom properties (Mapbox API key, fields, etc.)
   - Test the extension functionality

## Architecture & Project Organization

### Project Structure

```
map_custom/
├── block.json                    # Extension configuration
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── eslint.config.mjs             # ESLint configuration
│
├── frontend/                      # Main frontend code
│   ├── index.tsx                 # Entry point and main component
│   ├── types.ts                  # TypeScript type definitions
│   ├── constants.ts              # Application constants
│   ├── customProperties.ts       # Custom properties configuration
│   ├── style.css                 # Global styles
│   │
│   ├── components/               # React components
│   │   ├── ConfigurationScreen.tsx
│   │   ├── MapMarker.tsx
│   │   ├── PointsCounter.tsx
│   │   ├── RecenterButton.tsx
│   │   ├── ColorCustomizationBar.tsx
│   │   ├── ColorFieldSelectionModal.tsx
│   │   ├── ColorValuesModal.tsx
│   │   ├── ColorPicker.tsx
│   │   ├── MapConfigurationPanel.tsx
│   │   ├── MapControlsGroup.tsx
│   │   ├── MarkerIconSelector.tsx
│   │   ├── MarkerSizeControl.tsx
│   │   ├── InfoIcon.tsx
│   │   ├── InfoModal.tsx
│   │   ├── RefreshButton.tsx
│   │   ├── configuration/
│   │   │   └── ColorConfigurationColumn.tsx
│   │   └── index.ts              # Barrel exports
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useMapViewState.ts    # Map view state management
│   │   ├── useGPSLocations.ts    # GPS coordinate parsing
│   │   ├── useColorCustomization.ts  # Color customization logic
│   │   ├── useColorCounters.ts   # Color counters calculation
│   │   ├── useMarkerCustomization.ts # Marker size/icon state
│   │   ├── useMapInteractions.ts # UI interaction state
│   │   ├── useMapHandlers.ts     # Event handlers
│   │   ├── useInitialMapView.ts   # Initial map positioning
│   │   └── index.ts              # Barrel exports
│   │
│   └── utils/                    # Utility functions
│       ├── gpsParser.ts          # GPS coordinate parsing
│       ├── makiIcons.ts          # Mapbox Maki icon utilities
│       └── index.ts              # Barrel exports
│
└── context-orion/                # Orion-specific context files
```

### Component Architecture

The extension follows a **modular component architecture** with clear separation of concerns:

#### Main Component (`frontend/index.tsx`)
- **Orchestrates** all hooks and components
- **Manages** custom properties configuration
- **Handles** conditional rendering (configuration screen, error screen, map interface)
- **Coordinates** data flow between hooks

#### UI Components (`frontend/components/`)
- **ConfigurationScreen**: Setup instructions when extension is not configured
- **MapMarker**: Individual map markers with context menus
- **PointsCounter**: Displays total points and color breakdown
- **RecenterButton**: Button to reset map view
- **ColorCustomizationBar**: Compact bar for color management
- **ColorFieldSelectionModal**: Modal for selecting color field
- **ColorValuesModal**: Modal for customizing colors per value
- **ColorPicker**: Full-screen color selection modal
- **MapConfigurationPanel**: Collapsible configuration panel
- **MapControlsGroup**: Marker customization controls
- **InfoModal**: Help and support information

### Hooks Architecture

The extension uses **custom React hooks** to manage state and logic:

#### State Management Hooks
- **`useMapViewState`**: Manages map view (lat, lng, zoom) with localStorage persistence
- **`useMarkerCustomization`**: Manages marker size and icon type with persistence
- **`useMapInteractions`**: Manages UI interaction state (hover, menus, modals)

#### Data Processing Hooks
- **`useGPSLocations`**: Parses GPS coordinates from records and returns location data
- **`useColorCustomization`**: Complete color customization state management
- **`useColorCounters`**: Calculates statistics for color-coded markers

#### Business Logic Hooks
- **`useMapHandlers`**: Event handlers for map interactions (click, zoom, show details)
- **`useInitialMapView`**: Handles initial map positioning (auto-center vs saved view)

### Data Flow

1. **Initialization**:
   - Extension loads → `initializeBlock` called
   - Custom properties loaded via `useCustomProperties`
   - Base and table accessed via `useBase` and `useRecords`

2. **Data Processing**:
   - Records → `useGPSLocations` → Valid location data
   - Records + Color config → `useColorCustomization` → Color assignments
   - Locations + Color config → `useColorCounters` → Statistics

3. **State Management**:
   - Map view state persisted in localStorage via `useMapViewState`
   - Marker customization persisted via `useMarkerCustomization`
   - Color configuration persisted via `useColorCustomization`

4. **Rendering**:
   - Map renders with markers from processed location data
   - UI components display statistics and controls
   - User interactions trigger handlers from `useMapHandlers`

5. **Updates**:
   - Record changes trigger re-renders via `useRecords` reactivity
   - State changes update localStorage automatically
   - Map view updates reactively via `useMapViewState`

## Setup

### 1. Prepare Your Data

Make sure your Airtable table has:

-   **A text field for GPS coordinates** in the format: `latitude, longitude`  
    Example: `44.48273, 3.053849`
-   **A text field for location names** (e.g., "Project Site A", "Office Paris")
-   *(Optional)* **A field for color-coding** - Supported types:
    - Single Select or Multiple Selects (e.g., "Status", "Priority")
    - Checkbox (e.g., "Active", "Completed")
    - User, Created by, Last modified by (e.g., "Assigned to")
    - Formula (text values)

### 2. Configure Custom Properties

In your Airtable Interface, configure the extension's custom properties:

#### Required:
-   **Mapbox API Key**: Your Mapbox access token (get one at https://mapbox.com)
-   **Label Field**: The field containing location names
-   **GPS Coordinates Field**: The field with coordinates in "latitude, longitude" format

#### Optional:
-   **Auto-center on load** (boolean, default: true): Automatically fit map to show all points on first load

### 3. Get a Mapbox API Key

1. Sign up for a free Mapbox account at https://mapbox.com
2. Create an API access token with the `styles:read` scope
3. Copy the token and paste it into the "Mapbox API Key" custom property

**Note**: The free tier includes 50,000 map loads per month, which is typically sufficient for most use cases.

### 4. Enable Record Details (Optional)

To allow users to open record detail panels from the map:

1. In your Interface page settings, enable **"Click into record details"**
2. Users will see "Show details" option in pin context menus

## How It Works

### Data Flow
1. **Record loading**: The extension reads records from your table with any filters you've applied
2. **GPS parsing**: Coordinates are parsed directly from your GPS field (no external API calls needed)
3. **Visibility filtering**: Only markers for visible values are displayed (if configured)
4. **Map rendering**: Valid locations are displayed as customizable markers on the interactive map
5. **Color application**: If configured, markers are colored based on your selected field values
6. **Statistics**: Counters update in real-time showing total points and breakdown by color

### User Interactions

#### Configuration Panel
- **Collapsible panel**: Located at the top of the map, closed by default
- **Click header**: Click anywhere on the "Configuration de la carte" bar to expand/collapse
- **Color customization column**: Configure field-based marker colors
- **Easy removal**: Click the X icon next to a selected field to remove color customization
- **Persistent state**: Panel state is saved per session

#### Marker Interactions
- **Hover**: See the location name in a tooltip
- **Click**: Open a context menu with options:
  - **Zoom to location**: Focus on that specific point
  - **Show details**: Open the full Airtable record panel (when enabled)

#### Map Controls
- **Marker customization** (bottom-right):
  - **Icon selector**: Choose from 3 marker styles (pin, circle, triangle)
  - **Size slider**: Vertical slider to adjust marker size
- **Recenter button**: Reset the view to show all points with crosshair icon
- **Info icon**: Access help modal with usage instructions and support
- **Navigation controls**: Standard Mapbox controls for zoom and rotation
- **Pan & zoom**: Click and drag to pan, scroll to zoom

#### Color Customization
1. **Open configuration panel**: Click the header to expand
2. Click **"Choisir un champ"** in the color customization column
3. Select any compatible field from the searchable list
4. **Quick setup**: Click "Auto" to assign colors randomly
5. **Manual setup**: Click any color circle to choose from Airtable's color palette
6. **Toggle visibility**: Click the eye icon next to any value to hide/show its markers
7. **Remove field**: Click the X icon next to the field name to remove customization

**Value Visibility:**
- Hidden values appear grayed out in the modal
- Markers for hidden values are not displayed on the map
- Color counter reflects only visible values
- Visibility settings are saved locally

### Persistence
All settings are saved to localStorage per base/table:
- Map position and zoom level
- Color customization field and colors
- Value visibility settings
- Marker size and icon type
- Configuration panel collapsed/expanded state

## Permissions

The extension requires the following permissions:

-   **Read access**: To view records from your table
-   **Record expansion** (optional): To open record detail panels when clicking "Show details"

**Note**: All permissions are managed through Airtable's Interface Extension settings.

## Troubleshooting

### Map Issues

**Map not loading**
- Check that your Mapbox API key is valid
- Verify the key has the `styles:read` scope
- Check your browser console for error messages

**Markers not appearing**
- Verify your GPS coordinates are in the correct format: `latitude, longitude`
- Check that coordinates are within valid ranges (latitude: -90 to 90, longitude: -180 to 180)
- Ensure the GPS field is properly configured in custom properties
- Check if values are hidden (eye icon with slash in color customization modal)
- Verify that native Airtable filters are not hiding the records

**White space at bottom of map**
- Try closing and reopening the configuration panel
- Refresh the page if issue persists

### Interaction Issues

**Record details not opening**
- Enable **"Click into record details"** in your Interface page settings
- Check that you have permission to expand records

**Colors not saving**
- localStorage may be blocked by your browser
- Check browser privacy settings
- Try clearing cache and reconfiguring

**View not remembered**
- localStorage may be blocked or cleared between sessions
- Check if you're in private/incognito mode

**Marker customization not persisting**
- Ensure localStorage is enabled
- Settings are saved per base and table combination
- Try clearing browser cache if issues persist

### Customization Issues

**Can't select field for colors**
- Text, number, and date fields are excluded (too many unique values)
- Only categorical fields are available (Select, Checkbox, User, etc.)
- Check that the table has compatible fields

**Hidden values still showing**
- Ensure you've clicked the eye icon to hide the value (icon should show slash)
- Refresh if markers don't disappear immediately

**Configuration panel not collapsing**
- Click anywhere on the gray header bar
- Panel state is saved automatically

### Performance

**Slow rendering with many markers**
- Consider using Airtable's native filters to reduce displayed markers
- Hide values you don't need using the eye icon
- The extension can handle hundreds of markers efficiently
- Use marker size slider to make smaller markers for dense areas

**Need help?** 
- Click the info icon (ℹ️) on the map for built-in instructions
- Contact ERP team via Teams for bugs
- Create a ticket for feature requests
- Check REFACTORING_SUMMARY.md for technical details

---

## Technical Details

### Architecture
This extension uses GPS coordinates directly from your Airtable records - no external geocoding API calls are needed. This means:
- ✅ **Faster loading**: No API delays
- ✅ **No geocoding costs**: Only map tile loads count against your Mapbox quota
- ✅ **Offline-ready**: Works without additional API dependencies
- ✅ **Privacy-friendly**: Your location data stays in Airtable

**Recent Improvements:**
- ✅ **Modular architecture**: Code split into reusable hooks and components
- ✅ **Performance optimized**: Proper memoization and efficient rendering
- ✅ **41% smaller main file**: Better code organization with separation of concerns
- ✅ **Custom Maki icons**: Uses Mapbox's official icon set with dynamic coloring

For detailed technical documentation, see:
- **frontend/README.md** - Frontend code organization
- **REFACTORING_SUMMARY.md** - Recent code improvements

### Security Note

The Mapbox API key is stored as an Interface Extension custom property configured by the builder; it is not hard-coded in the extension. However, the token is still exposed when the extension is running in the browser. 

**Best practices:**
- Use URL restrictions in your Mapbox account to limit key usage
- Rotate keys periodically
- Monitor usage in your Mapbox dashboard
- Use the free tier for most use cases (50,000 map loads/month)
