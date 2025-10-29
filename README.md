# Map Interface Extension for Airtable

This Airtable Interface Extension displays your records on a fullscreen interactive map using Mapbox with GPS coordinates. Perfect for visualizing project locations, site visits, or any data with geographic coordinates.

## Features

### Core Mapping
-   **Fullscreen map**: Renders a fullscreen map with pins for each record containing GPS coordinates
-   **GPS coordinate parsing**: Directly uses GPS coordinates in "latitude, longitude" format
-   **Saved view state**: Remembers your last map position/zoom per base/table in localStorage
-   **Auto-centering**: Automatically fits the map to show all your points on first load
-   **Recenter button**: One-click button to reset the view and see all your points
-   **Dark mode support**: Automatically switches map style based on system theme
-   **Real-time updates**: Map updates automatically when records change

### Interactive Pins
-   **Context menu**: Click any pin to access:
    -   🔍 **Zoom to location**: Focus on a specific point
    -   📋 **Show details**: Open the full record detail panel (when permitted)
-   **Hover tooltips**: See location names on hover
-   **Dynamic colors**: Color-code your pins based on field values

### Visual Customization
-   **Color by field**: Assign colors to pins based on Single Select or Multiple Selects field values
-   **Color picker**: Choose from 10 official Airtable colors for each value
-   **Auto-assign colors**: Quick setup with automatic color distribution
-   **Smart counters**: See total points and breakdown by color/value in real-time

### User Experience
-   **Points counter**: Always know how many locations are displayed
-   **Color statistics**: See count per value (e.g., "15 En cours", "12 Annulé")
-   **Search & filter**: Native Airtable filters work seamlessly
-   **Airtable-like UI**: Familiar modal-based interface for customization

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
3. **Map rendering**: Valid locations are displayed as pins on the interactive map
4. **Color application**: If configured, pins are colored based on your selected field values
5. **Statistics**: Counters update in real-time showing total points and breakdown by color

### User Interactions

#### Pin Interactions
- **Hover**: See the location name in a tooltip
- **Click**: Open a context menu with options:
  - **Zoom to location**: Focus on that specific point
  - **Show details**: Open the full Airtable record panel (when enabled)

#### Map Controls
- **Recenter button**: Reset the view to show all points
- **Navigation controls**: Standard Mapbox controls for zoom and rotation
- **Pan & zoom**: Click and drag to pan, scroll to zoom

#### Color Customization
1. Click **"+ Add a field"** in the customization bar
2. Select any compatible field (Select, Checkbox, User, Formula, etc.)
3. **Quick setup**: Click "Auto" to assign colors automatically
4. **Manual setup**: Click any color circle to choose from Airtable's color palette
5. Colors are applied instantly and saved in your browser

**Supported field types:**
- Single Select / Multiple Selects
- Checkbox (Yes/No)
- User / Created by / Last modified by
- Formula (text values)

### View Persistence
- Your last map position and zoom are saved to localStorage per base/table
- Color customization preferences are also saved locally
- On first load, the map auto-fits to show all points (unless disabled)

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

**Points not appearing**
- Verify your GPS coordinates are in the correct format: `latitude, longitude`
- Check that coordinates are within valid ranges (latitude: -90 to 90, longitude: -180 to 180)
- Ensure the GPS field is properly configured in custom properties

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

### Performance

**Slow rendering with many points**
- Consider using Airtable's native filters to reduce the number of displayed points
- The extension can handle hundreds of points efficiently

**Need help?** Check the ARCHITECTURE.md file for technical details or CUSTOMIZATION.md for color customization specifics.

---

## Technical Details

### Architecture
This extension uses GPS coordinates directly from your Airtable records - no external geocoding API calls are needed. This means:
- ✅ **Faster loading**: No API delays
- ✅ **No geocoding costs**: Only map tile loads count against your Mapbox quota
- ✅ **Offline-ready**: Works without additional API dependencies
- ✅ **Privacy-friendly**: Your location data stays in Airtable

For detailed technical documentation, see:
- **ARCHITECTURE.md** - Component structure and data flow
- **CUSTOMIZATION.md** - Color customization system details
- **frontend/README.md** - Frontend code organization

### Security Note

The Mapbox API key is stored as an Interface Extension custom property configured by the builder; it is not hard-coded in the extension. However, the token is still exposed when the extension is running in the browser. 

**Best practices:**
- Use URL restrictions in your Mapbox account to limit key usage
- Rotate keys periodically
- Monitor usage in your Mapbox dashboard
- Use the free tier for most use cases (50,000 map loads/month)
