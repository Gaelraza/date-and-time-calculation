# Architecture Log

## Initial Setup - 2024
- Created folder structure: /css, /js, /components
- Created index.html as main entry point
- Created style.css for cozy theme styling
- Created main.js for vanilla JavaScript logic
- Created component files for each calculator function

## File Structure
- /index.html - Main HTML file with header and calculator sections
- /css/style.css - Cozy theme styles, no animations, light and fast
- /js/main.js - Main JavaScript controller, handles navigation and state reset
- /components/calculator_utils.js - Utility functions for all calculators (time zones, date math, conversions)

## Changes Log
- Created folder structure: /css, /js, /components
- Created index.html with all 9 calculator sections
- Created style.css with cozy theme (warm colors, Georgia font, no transitions)
- Created calculator_utils.js with shared utility functions
- Created main.js with initialization and event handlers for all calculators
- Added script tag for calculator_utils.js in index.html

## Design Principles
- No camelCase anywhere in the codebase
- Pure vanilla JavaScript, no frameworks or dependencies
- Maximum 600 lines per component file
- No comments in code
- Simple cozy theme appropriate for date/time calculator
- Header contains only website title
- All calculators accessible directly from homepage
- Page refresh resets all calculators to default state
