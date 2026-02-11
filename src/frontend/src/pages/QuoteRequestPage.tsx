import { useState } from 'react';
import { useSubmitQuoteRequest } from '../hooks/useQueries';
import { CheckCircle, Loader2, Phone, Mail } from 'lucide-react';

export default function QuoteRequestPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    zipCode: '',
    address: '',
    windowNumber: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const { mutate: submitQuote, isPending } = useSubmitQuoteRequest();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode.trim())) {
      newErrors.zipCode = 'Please enter a valid ZIP code (e.g., 75024 or 75024-1234)';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.windowNumber.trim()) {
      newErrors.windowNumber = 'Number of windows is required';
    } else {
      const num = parseInt(formData.windowNumber);
      if (isNaN(num) || num <= 0 || !Number.isInteger(num)) {
        newErrors.windowNumber = 'Please enter a valid positive number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const zipCodeNum = parseInt(formData.zipCode.replace('-', ''));
    const windowNum = parseInt(formData.windowNumber);

    submitQuote(
      {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        zipCode: BigInt(zipCodeNum),
        address: formData.address.trim(),
        windowNumber: BigInt(windowNum),
        notes: formData.notes.trim() || undefined
      },
      {
        onSuccess: () => {
          setShowSuccess(true);
          setFormData({
            firstName: '',
            lastName: '',
            zipCode: '',
            address: '',
            windowNumber: '',
            notes: ''
          });
          setErrors({});
          
          // Hide success message after 5 seconds
          setTimeout(() => setShowSuccess(false), 5000);
        },
        onError: (error) => {
          setErrors({ submit: error.message || 'Failed to submit quote request. Please try again.' });
        }
      }
    );
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="w-full section-padding">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-foreground mb-4">Request a Quote</h1>
            <p className="text-lg text-muted-foreground">
              Fill out the form below and we'll get back to you with a free estimate.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>Call us at</span>
                <a
                  href="tel:214-284-1305"
                  className="font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  214-284-1305
                </a>
              </div>
              <span className="hidden sm:inline">•</span>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>Email us at</span>
                <a
                  href="mailto:paneprosnplano@gmail.com"
                  className="font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  paneprosnplano@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg flex items-start space-x-3 animate-fade-in">
              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-primary mb-1">Quote Request Submitted!</h3>
                <p className="text-sm text-muted-foreground">
                  Thank you for your request. We'll contact you soon with your free estimate.
                </p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 md:p-8 rounded-xl border shadow-soft">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                  First Name <span className="text-destructive">*</span>
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.firstName ? 'border-destructive' : 'border-input'
                  }`}
                  placeholder="John"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-destructive">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                  Last Name <span className="text-destructive">*</span>
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.lastName ? 'border-destructive' : 'border-input'
                  }`}
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-destructive">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* ZIP Code */}
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium mb-2">
                ZIP Code <span className="text-destructive">*</span>
              </label>
              <input
                id="zipCode"
                type="text"
                value={formData.zipCode}
                onChange={(e) => handleChange('zipCode', e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.zipCode ? 'border-destructive' : 'border-input'
                }`}
                placeholder="75024 or 75024-1234"
              />
              {errors.zipCode && (
                <p className="mt-1 text-sm text-destructive">{errors.zipCode}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium mb-2">
                Address <span className="text-destructive">*</span>
              </label>
              <input
                id="address"
                type="text"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.address ? 'border-destructive' : 'border-input'
                }`}
                placeholder="123 Main Street, Plano, TX"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-destructive">{errors.address}</p>
              )}
            </div>

            {/* Number of Windows */}
            <div>
              <label htmlFor="windowNumber" className="block text-sm font-medium mb-2">
                Number of Windows <span className="text-destructive">*</span>
              </label>
              <input
                id="windowNumber"
                type="number"
                min="1"
                step="1"
                value={formData.windowNumber}
                onChange={(e) => handleChange('windowNumber', e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.windowNumber ? 'border-destructive' : 'border-input'
                }`}
                placeholder="10"
              />
              {errors.windowNumber && (
                <p className="mt-1 text-sm text-destructive">{errors.windowNumber}</p>
              )}
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium mb-2">
                Additional Notes <span className="text-muted-foreground text-xs">(Optional)</span>
              </label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Any special requirements or questions..."
              />
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive">{errors.submit}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Submit Quote Request</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
