import { useState } from 'react';
import HomePage from './pages/HomePage';
import QuoteRequestPage from './pages/QuoteRequestPage';
import OtherJobsPage from './pages/OtherJobsPage';
import AdminLoginPage from './pages/AdminLoginPage';
import ViewQuotesPage from './pages/ViewQuotesPage';
import MaintenancePage from './pages/MaintenancePage';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import { useMaintenanceMode } from './hooks/useMaintenanceMode';

type Page = 'home' | 'quote' | 'otherJobs' | 'adminLogin' | 'viewQuotes';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const { data: isMaintenanceMode, isLoading: maintenanceLoading, isFetched } = useMaintenanceMode();

  const renderPage = () => {
    // Admin pages are always accessible regardless of maintenance mode
    const adminPages: Page[] = ['adminLogin', 'viewQuotes'];
    if (adminPages.includes(currentPage)) {
      switch (currentPage) {
        case 'adminLogin':
          return <AdminLoginPage />;
        case 'viewQuotes':
          return <ViewQuotesPage onNavigate={setCurrentPage} />;
      }
    }

    // Public pages: only show maintenance if explicitly enabled and data is fetched
    // Default to showing normal content during loading or on error
    const shouldShowMaintenance = isFetched && isMaintenanceMode === true;

    if (shouldShowMaintenance) {
      return <MaintenancePage onNavigateToAdminLogin={() => setCurrentPage('adminLogin')} />;
    }

    // Render normal public pages
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'quote':
        return <QuoteRequestPage />;
      case 'otherJobs':
        return <OtherJobsPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <SiteFooter />
    </div>
  );
}
