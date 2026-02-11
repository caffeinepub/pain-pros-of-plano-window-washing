import { Menu, X, Phone } from 'lucide-react';
import { useState } from 'react';
import { useAdminAuth } from '../hooks/useAdminAuth';

type Page = 'home' | 'quote' | 'otherJobs' | 'adminLogin' | 'viewQuotes';

interface SiteHeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function SiteHeader({ currentPage, onNavigate }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, isAdmin } = useAdminAuth();

  const navItems = [
    { id: 'home' as Page, label: 'Home' },
    { id: 'otherJobs' as Page, label: 'Other Services' },
    { id: 'quote' as Page, label: 'Request a Quote' },
  ];

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Admin navigation is always available regardless of maintenance mode
  const adminNavItem = isAuthenticated && isAdmin
    ? { id: 'viewQuotes' as Page, label: 'View Quotes' }
    : { id: 'adminLogin' as Page, label: 'Admin Login' };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 font-bold text-xl md:text-2xl text-primary hover:text-primary/80 transition-colors"
          >
            <span>Pane Pros of Plano</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  currentPage === item.id
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick(adminNavItem.id)}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                currentPage === adminNavItem.id
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              {adminNavItem.label}
            </button>
            <a
              href="tel:214-284-1305"
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              <Phone className="h-4 w-4" />
              <span>214-284-1305</span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-3 border-t animate-fade-in">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-4 py-2 rounded-md transition-colors ${
                  currentPage === item.id
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick(adminNavItem.id)}
              className={`block w-full text-left px-4 py-2 rounded-md transition-colors ${
                currentPage === adminNavItem.id
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              {adminNavItem.label}
            </button>
            <a
              href="tel:214-284-1305"
              className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              <Phone className="h-4 w-4" />
              <span>214-284-1305</span>
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
