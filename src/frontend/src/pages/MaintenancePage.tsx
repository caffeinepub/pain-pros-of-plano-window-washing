import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Construction, LogIn } from 'lucide-react';

interface MaintenancePageProps {
  onNavigateToAdminLogin: () => void;
}

export default function MaintenancePage({ onNavigateToAdminLogin }: MaintenancePageProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-muted/20 py-12 px-4 flex items-center justify-center">
      <div className="container-custom max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mb-2">
              <Construction className="h-8 w-8 text-warning" />
            </div>
            <CardTitle className="text-3xl">Site Under Maintenance</CardTitle>
            <CardDescription className="text-base">
              We're currently performing scheduled maintenance to improve your experience.
              Please check back soon.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center text-sm text-muted-foreground">
              <p>For urgent inquiries, please call:</p>
              <p className="text-lg font-semibold text-foreground mt-1">214-284-1305</p>
            </div>
            <div className="pt-4 border-t">
              <Button
                onClick={onNavigateToAdminLogin}
                variant="outline"
                className="w-full"
                size="lg"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Admin Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
