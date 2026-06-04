import os
import re
import glob

props_destructure = """  const { season, setSeason, currentUser, setCurrentUser, destinations, setDestinations, bookings, setBookings, tickets, setTickets, navigate, location, pathParts, activeTab, showSeasonDropdown, setShowSeasonDropdown, showBlogLightbox, setShowBlogLightbox, getSeasonIcon, selectedDest, selectedProduct, setSelectedDest, setSelectedProduct, activeDetailSection, setActiveDetailSection, expandedDay, setExpandedDay, showProductLightbox, setShowProductLightbox, showMobilePriceBox, setShowMobilePriceBox, bookingDest, setBookingDest, showAuthModal, setShowAuthModal, calcGuests, setCalcGuests, calcNights, setCalcNights, calcExtraHeli, setCalcExtraHeli, checkedPackingItems, setCheckedPackingItems, searchQuery, setSearchQuery, priceRange, setPriceRange, filterSeason, setFilterSeason, timeRemaining, setTimeRemaining, autoplayActive, setAutoplayActive, activePromoIndex, setActivePromoIndex, currentTheme, handleAddNewBooking, handleSupportTicketSubmit, handleAddUserReply, handleAdminReplyTicket, handleUpdateBookingStep, handleTweakInventorySurge, handleUserLogin, handleLogout, handlePostReview, filteredDestinations } = props;"""

for filepath in glob.glob('src/pages/*.tsx'):
    if 'HomePage.tsx' in filepath:
        continue # Already fixed manually
        
    with open(filepath, 'r') as f:
        content = f.read()
        
    # Find the export const PageName = (...) => {
    # It might look like: export const SearchPage = ({ activeTab... }: any) => {
    new_content = re.sub(r'export const (\w+) = \([^)]+\) => \{', f'export const \\1 = (props: any) => {{\n{props_destructure}', content)
    
    with open(filepath, 'w') as f:
        f.write(new_content)
        
print("Successfully injected mega props destructuring into all pages.")
