import { Phone, Sparkles, CheckCircle, ArrowRight, Droplets, Wind, Leaf, Wrench } from 'lucide-react';

type Page = 'home' | 'quote' | 'otherJobs';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary/5 via-accent/5 to-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>Professional Window Washing Services</span>
            </div>
            
            <h1 className="text-foreground">
              Crystal Clear Windows,<br />
              <span className="text-primary">Every Time</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Pane Pros of Plano delivers spotless, streak-free windows for your home or business.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="tel:214-284-1305"
                className="group flex items-center space-x-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl font-semibold text-lg"
              >
                <Phone className="h-5 w-5" />
                <span>214-284-1305</span>
              </a>
              
              <button
                onClick={() => onNavigate('quote')}
                className="group flex items-center space-x-2 px-8 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-all font-semibold text-lg"
              >
                <span>Request a Quote</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Phone Number Emphasis */}
            <div className="pt-8">
              <p className="text-sm text-muted-foreground mb-2">Call us today for a free estimate</p>
              <a
                href="tel:214-284-1305"
                className="text-3xl md:text-4xl font-bold text-primary hover:text-primary/80 transition-colors"
              >
                214-284-1305
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-foreground mb-4">Why Choose Pane Pros?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're committed to delivering exceptional results and outstanding service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles className="h-8 w-8" />,
                title: 'Spotless Results',
                description: 'Streak-free, crystal clear windows that shine like new.'
              },
              {
                icon: <CheckCircle className="h-8 w-8" />,
                title: 'Professional Service',
                description: 'Experienced team with attention to detail and customer satisfaction.'
              },
              {
                icon: <Phone className="h-8 w-8" />,
                title: 'Easy Scheduling',
                description: 'Quick quotes and flexible scheduling to fit your needs.'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-card border hover:shadow-soft transition-all"
              >
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Services Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div>
              <h2 className="text-foreground mb-4">Other Jobs We Do</h2>
              <p className="text-lg text-muted-foreground">
                Beyond window washing, we offer additional services to keep your property in top shape.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  icon: <Droplets className="h-6 w-6" />, 
                  title: 'Gutter Cleaning',
                  description: 'Keep your gutters clear and prevent water damage.',
                  image: '/assets/generated/service-gutter-cleaning.dim_1200x800.jpg'
                },
                { 
                  icon: <Sparkles className="h-6 w-6" />, 
                  title: 'Solar Panel Cleaning',
                  description: 'Maximize efficiency with spotless solar panels.',
                  image: '/assets/generated/service-solar-panel-cleaning.dim_1200x800.jpg'
                },
                { 
                  icon: <Wind className="h-6 w-6" />, 
                  title: 'Power Washing',
                  description: 'Restore surfaces with professional pressure cleaning.',
                  image: '/assets/generated/service-power-washing.dim_1200x800.jpg'
                },
                { 
                  icon: <Leaf className="h-6 w-6" />, 
                  title: 'Raking Leaves',
                  description: 'Seasonal yard cleanup to keep your property tidy.',
                  image: '/assets/generated/service-raking-leaves.dim_1200x800.jpg'
                }
              ].map((service, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-card border hover:shadow-soft transition-all flex flex-col overflow-hidden"
                >
                  <div className="relative w-full h-32 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3 mx-auto">
                      {service.icon}
                    </div>
                    <h3 className="font-semibold text-base mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <p className="text-muted-foreground mb-4">
                <Wrench className="h-5 w-5 inline-block mr-2 text-primary" />
                Plus other small duties that most companies wouldn't handle
              </p>
              <button
                onClick={() => onNavigate('otherJobs')}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl font-semibold"
              >
                <span>View All Services</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6 p-8 md:p-12 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border">
            <h2 className="text-foreground">Ready for Sparkling Clean Windows?</h2>
            <p className="text-lg text-muted-foreground">
              Get your free quote today and experience the Pane Pros difference.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('quote')}
                className="inline-flex items-center space-x-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl font-semibold text-lg"
              >
                <span>Request a Quote</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <a
                href="tel:214-284-1305"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-all font-semibold text-lg"
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
