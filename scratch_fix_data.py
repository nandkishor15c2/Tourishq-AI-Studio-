import re

with open('src/App.tsx', 'r') as f:
    app_content = f.read()

# Extract PROMOTIONS and SEASONAL_THEMES_DATA
promotions_match = re.search(r'const PROMOTIONS = \[\n(.*?)\n\];', app_content, re.DOTALL)
themes_match = re.search(r'const SEASONAL_THEMES_DATA = \[\n(.*?)\n\];', app_content, re.DOTALL)

if promotions_match and themes_match:
    promotions_str = f"export const PROMOTIONS = [\n{promotions_match.group(1)}\n];\n"
    themes_str = f"export const SEASONAL_THEMES_DATA = [\n{themes_match.group(1)}\n];\n"
    
    # Append to data.ts
    with open('src/data.ts', 'a') as f:
        f.write("\n\n// Added from App.tsx\n")
        f.write(promotions_str)
        f.write("\n")
        f.write(themes_str)
        f.write("\n")
        
    # Remove from App.tsx
    app_content = app_content.replace(f"const PROMOTIONS = [\n{promotions_match.group(1)}\n];\n", "")
    app_content = app_content.replace(f"const SEASONAL_THEMES_DATA = [\n{themes_match.group(1)}\n];\n", "")
    
    # Add to imports in App.tsx
    app_content = app_content.replace(
        "import {\n  DESTINATIONS,",
        "import {\n  PROMOTIONS,\n  SEASONAL_THEMES_DATA,\n  DESTINATIONS,"
    )
    
    with open('src/App.tsx', 'w') as f:
        f.write(app_content)
    print("Successfully moved constants to data.ts")
else:
    print("Could not find the constants in App.tsx!")
