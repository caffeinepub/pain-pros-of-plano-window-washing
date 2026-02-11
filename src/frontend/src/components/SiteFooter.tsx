export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-lg mb-3 text-primary">Pane Pros of Plano</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Professional Window Washing Services
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Owner: Rylan Myers
            </p>
            <a
              href="tel:214-284-1305"
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors block mb-2"
            >
              214-284-1305
            </a>
            <a
              href="mailto:paneprosnplano@gmail.com"
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors block"
            >
              paneprosnplano@gmail.com
            </a>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Residential Window Cleaning</li>
              <li>Commercial Window Washing</li>
              <li>Storefront Glass Cleaning</li>
              <li>Multi-Pane Window Service</li>
              <li>Gutter Cleaning</li>
              <li>Solar Panel Cleaning</li>
              <li>Power Washing</li>
              <li>Raking Leaves</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Service Area</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Proudly serving Plano, TX and surrounding areas
            </p>
            <h4 className="font-semibold text-sm mb-3">Hours</h4>
            <p className="text-sm text-muted-foreground">
              Monday - Saturday<br />
              8:00 AM - 6:00 PM
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} Pane Pros of Plano. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
