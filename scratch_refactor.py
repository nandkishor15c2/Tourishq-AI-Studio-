import os
import re

app_path = 'src/App.tsx'
pages_dir = 'src/pages'
os.makedirs(pages_dir, exist_ok=True)

with open(app_path, 'r') as f:
    content = f.read()

view1_start = '{/* VIEW 1: HOME LANDING PAGE */}'
view2_start = '{/* VIEW 2: DETAILED DESTINATION CATALOG (Search & Filtering) */}'

if view1_start in content and view2_start in content:
    idx_start = content.index(view1_start)
    idx_end = content.index(view2_start)
    
    view1_block = content[idx_start:idx_end]
    
    home_page_code = f"""import React, {{ useState }} from 'react';
import {{ Compass, MapPin, Star, PlayCircle, ArrowRight, CheckCircle2, Navigation, Activity }} from 'lucide-react';
import {{ motion, AnimatePresence }} from 'framer-motion';

export const HomePage = ({{ currentTheme, navigate, activeTab, getActiveTabColor, destinations }}: any) => {{
  const [calcGuests, setCalcGuests] = useState(2);
  const [calcNights, setCalcNights] = useState(5);
  const [calcExtraHeli, setCalcExtraHeli] = useState(false);
  const [checkedPackingItems, setCheckedPackingItems] = useState<Record<string, boolean>>({{}});

  return (
    <>
{view1_block}
    </>
  );
}};
"""
    with open('src/pages/HomePage.tsx', 'w') as f:
        f.write(home_page_code)
        
    # Replace block in App.tsx
    new_content = content[:idx_start] + view1_start + "\n        {activeTab === 'home' && <HomePage currentTheme={currentTheme} navigate={navigate} activeTab={activeTab} getActiveTabColor={getActiveTabColor} destinations={destinations} />}\n\n        " + content[idx_end:]
    
    with open(app_path, 'w') as f:
        f.write(new_content)
    print("Success: HomePage.tsx extracted!")
else:
    print("Could not find markers.")
