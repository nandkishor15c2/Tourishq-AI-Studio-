import os

app_path = 'src/App.tsx'

with open(app_path, 'r') as f:
    content = f.read()

v2_start = '{/* VIEW 2: DETAILED DESTINATION CATALOG (Search & Filtering) */}'
v3_start = '{/* VIEW 3: NEW DESTINATION PAGE */}'
v4_start = '{/* VIEW 4: PRODUCT DETAIL PAGE */}'
v4_end = '{/* VIEW 4: ESCALATION / CONTACT US */}'

if v2_start in content and v3_start in content and v4_start in content and v4_end in content:
    idx2 = content.index(v2_start)
    idx3 = content.index(v3_start)
    idx4 = content.index(v4_start)
    idx5 = content.index(v4_end)
    
    view2_block = content[idx2:idx3]
    view3_block = content[idx3:idx4]
    view4_block = content[idx4:idx5]
    
    # Write SearchPage.tsx
    with open('src/pages/SearchPage.tsx', 'w') as f:
        f.write(f"""import React from 'react';
import {{ Compass, MapPin, Search }} from 'lucide-react';
import {{ ProductCard }} from '../components/ProductCard';

export const SearchPage = ({{ activeTab, searchQuery, setSearchQuery, priceRange, setPriceRange, filterSeason, setFilterSeason, currentTheme, filteredDestinations, setSelectedDest }}: any) => {{
  return (
    <>
{view2_block}
    </>
  );
}};
""")

    # Write DestinationPage.tsx
    with open('src/pages/DestinationPage.tsx', 'w') as f:
        f.write(f"""import React from 'react';
import {{ Compass, MapPin, Thermometer, CloudRain, Info, Droplets, Wind, ArrowRight, Navigation }} from 'lucide-react';
import {{ ProductCard }} from '../components/ProductCard';

export const DestinationPage = ({{ selectedDest, selectedProduct, setSelectedDest, setSelectedProduct, activeDetailSection, setActiveDetailSection, currentTheme }}: any) => {{
  return (
    <>
{view3_block}
    </>
  );
}};
""")

    # Write ProductDetailPage.tsx
    with open('src/pages/ProductDetailPage.tsx', 'w') as f:
        f.write(f"""import React from 'react';
import {{ MapPin, ArrowRight, CheckCircle2, ChevronDown, Compass, Shield, Clock, Info, ShieldCheck, HeartPulse, HelpCircle }} from 'lucide-react';

export const ProductDetailPage = ({{ selectedDest, selectedProduct, setSelectedProduct, activeDetailSection, setActiveDetailSection, expandedDay, setExpandedDay, showMobilePriceBox, setShowMobilePriceBox, handleAddNewBooking, currentTheme, setShowBookingWizard }}: any) => {{
  return (
    <>
{view4_block}
    </>
  );
}};
""")

    # Replace in App.tsx
    new_content = (content[:idx2] 
      + v2_start + "\n        {activeTab === 'search' && !selectedDest && <SearchPage activeTab={activeTab} searchQuery={searchQuery} setSearchQuery={setSearchQuery} priceRange={priceRange} setPriceRange={setPriceRange} filterSeason={filterSeason} setFilterSeason={setFilterSeason} currentTheme={currentTheme} filteredDestinations={filteredDestinations} setSelectedDest={setSelectedDest} />}\n\n        " 
      + v3_start + "\n        {selectedDest && !selectedProduct && <DestinationPage selectedDest={selectedDest} selectedProduct={selectedProduct} setSelectedDest={setSelectedDest} setSelectedProduct={setSelectedProduct} activeDetailSection={activeDetailSection} setActiveDetailSection={setActiveDetailSection} currentTheme={currentTheme} />}\n\n        "
      + v4_start + "\n        {selectedDest && selectedProduct && <ProductDetailPage selectedDest={selectedDest} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} activeDetailSection={activeDetailSection} setActiveDetailSection={setActiveDetailSection} expandedDay={expandedDay} setExpandedDay={setExpandedDay} showMobilePriceBox={showMobilePriceBox} setShowMobilePriceBox={setShowMobilePriceBox} handleAddNewBooking={handleAddNewBooking} currentTheme={currentTheme} setShowBookingWizard={setShowBookingWizard} />}\n\n        "
      + content[idx5:])
      
    with open(app_path, 'w') as f:
        f.write(new_content)
    print("Success: Extracted Views 2, 3, and 4.")
else:
    print("Could not find markers for views 2, 3, 4.")
