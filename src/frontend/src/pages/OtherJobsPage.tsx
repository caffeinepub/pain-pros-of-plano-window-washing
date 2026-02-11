import { Droplets, Sparkles, Wind, Leaf, Wrench, Phone } from 'lucide-react';

export default function OtherJobsPage() {
  const services = [
    {
      icon: <Droplets className="h-8 w-8" />,
      title: 'Gutter Cleaning',
      description: 'Keep your gutters flowing freely and protect your home from water damage with our thorough gutter cleaning service.',
      image: '/assets/generated/service-gutter-cleaning.dim_1200x800.jpg'
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: 'Solar Panel Cleaning',
      description: 'Maximize your solar panel efficiency with professional cleaning that removes dirt, debris, and buildup.',
      image: '/assets/generated/service-solar-panel-cleaning.dim_1200x800.jpg'
    },
    {
      icon: <Wind className="h-8 w-8" />,
      title: 'Power Washing',
      description: 'Restore the beauty of your exterior surfaces with our professional power washing services for driveways, patios, and siding.',
      image: '/assets/generated/service-power-washing.dim_1200x800.jpg'
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: 'Raking Leaves',
      description: 'Keep your yard clean and tidy with our leaf raking service, perfect for maintaining your outdoor spaces.',
      image: '/assets/generated/service-raking-leaves.dim_1200x800.jpg'
    },
    {
      icon: <Wrench className="h-8 w-8" />,
      title: 'Other Small Duties',
      description: 'We handle those small jobs that most companies wouldn\'t take on. If you need help with minor tasks, just ask!',
      image: '/assets/generated/service-other-small-duties.dim_1200x800.jpg'
    }
  ];

  return (
    <div className="w-full">
      {/* Header Section */}
      <section className="section-padding bg-gradient-to-br from-primary/5 via-accent/5 to-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
              <Wrench className="h-4 w-4" />
              <span>Additional Services</span>
            </div>
            
            <h1 className="text-foreground">
              Other Jobs We Do
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Beyond window washing, Pane Pros of Plano offers a variety of services to keep your property looking its best.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="rounded-xl bg-card border hover:shadow-soft transition-all animate-fade-in overflow-hidden flex flex-col"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-foreground">No Job Too Small</h2>
            <p className="text-lg text-muted-foreground">
              At Pane Pros of Plano, we believe in providing comprehensive service to our customers. 
              Whether it's a major project or a small task that other companies won't handle, we're here to help. 
              Our goal is to be your go-to solution for all your property maintenance needs.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6 p-8 md:p-12 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border">
            <h2 className="text-foreground">Need Help with a Project?</h2>
            <p className="text-lg text-muted-foreground">
              Contact us today to discuss your needs and get a free quote for any of our services.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:214-284-1305"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl font-semibold text-lg"
              >
                <Phone className="h-5 w-5" />
                <span>214-284-1305</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
