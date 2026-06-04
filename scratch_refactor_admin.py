import os

app_path = 'src/App.tsx'

with open(app_path, 'r') as f:
    content = f.read()

v_escalation = '{/* VIEW 4: ESCALATION / CONTACT US */}'
v_dashboard = '{/* VIEW 5: ACCOUNT PROFILE DASHBOARD (My Escapes / Upcoming / Live / Past) */}'
v_admin = '{/* VIEW 7: INTERNAL TEAM ADMIN REVENUE & OPERATIONS DASHBOARD */}'
v_about = '{/* VIEW 6: ABOUT TOURISHQ EXPERIMENTAL ARCHITECTURE */}'
v_end = '{/* Global Modals / Footers */}'

if v_escalation in content and v_dashboard in content and v_about in content and v_end in content:
    idx_esc = content.index(v_escalation)
    idx_dash = content.index(v_dashboard)
    idx_admin = content.index(v_admin)
    idx_about = content.index(v_about)
    idx_end = content.index(v_end)
    
    escalation_block = content[idx_esc:idx_dash]
    dashboard_block = content[idx_dash:idx_admin]
    admin_block = content[idx_admin:idx_about]
    about_block = content[idx_about:idx_end]
    
    # Write SupportPage.tsx
    with open('src/pages/SupportPage.tsx', 'w') as f:
        f.write(f"""import React from 'react';
import {{ ShieldAlert, Navigation, Search }} from 'lucide-react';
import {{ SupportTicketSystem }} from '../components/SupportTicketSystem';

export const SupportPage = ({{ tickets, setTickets, handleSupportTicketSubmit, handleAddUserReply, currentUser }}: any) => {{
  return (
    <>
{escalation_block}
    </>
  );
}};
""")

    # Write DashboardPage.tsx
    with open('src/pages/DashboardPage.tsx', 'w') as f:
        f.write(f"""import React from 'react';
import {{ PlayCircle, Navigation, MapPin, Search }} from 'lucide-react';
import {{ AuthContainer }} from '../components/AuthContainer';

export const DashboardPage = ({{ currentUser, setShowAuthModal, bookings, timeRemaining, destinations }}: any) => {{
  return (
    <>
{dashboard_block}
    </>
  );
}};
""")

    # Write AdminPage.tsx
    with open('src/pages/AdminPage.tsx', 'w') as f:
        f.write(f"""import React from 'react';
import {{ InternalAdminDashboard }} from '../components/InternalAdminDashboard';

export const AdminPage = ({{ tickets, setTickets, bookings, handleUpdateBookingStep }}: any) => {{
  return (
    <>
{admin_block}
    </>
  );
}};
""")

    # Write AboutPage.tsx
    with open('src/pages/AboutPage.tsx', 'w') as f:
        f.write(f"""import React from 'react';
import {{ ShieldAlert, Navigation }} from 'lucide-react';

export const AboutPage = () => {{
  return (
    <>
{about_block}
    </>
  );
}};
""")

    # Replace in App.tsx
    new_content = (content[:idx_esc] 
      + v_escalation + "\n        {activeTab === 'support' && <SupportPage tickets={tickets} setTickets={setTickets} handleSupportTicketSubmit={handleSupportTicketSubmit} handleAddUserReply={handleAddUserReply} currentUser={currentUser} />}\n\n        "
      + v_dashboard + "\n        {activeTab === 'dashboard' && <DashboardPage currentUser={currentUser} setShowAuthModal={setShowAuthModal} bookings={bookings} timeRemaining={timeRemaining} destinations={destinations} />}\n\n        "
      + v_admin + "\n        {activeTab === 'admin' && <AdminPage tickets={tickets} setTickets={setTickets} bookings={bookings} handleUpdateBookingStep={handleUpdateBookingStep} />}\n\n        "
      + v_about + "\n        {activeTab === 'about' && <AboutPage />}\n\n        "
      + content[idx_end:])
      
    with open(app_path, 'w') as f:
        f.write(new_content)
    print("Success: Extracted Support, Dashboard, Admin, and About Pages.")
else:
    print("Could not find markers for remaining pages.")
