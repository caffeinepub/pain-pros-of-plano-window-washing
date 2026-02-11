import { useAdminAuth } from '../hooks/useAdminAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShieldAlert, LogIn, Loader2 } from 'lucide-react';
import { ReactNode } from 'react';

interface AdminAuthGateProps {
  children: ReactNode;
  onNavigateToLogin: () => void;
}

export function AdminAuthGate({ children, onNavigateToLogin }: AdminAuthGateProps) {
  const { isAuthenticated, isAdmin, isLoading } = useAdminAuth();

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-muted/20 py-12 px-4">
        <div className="container-custom max-w-2xl mx-auto">
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center space-y-3">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                <p className="text-muted-foreground">Checking authorization...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-muted/20 py-12 px-4">
        <div className="container-custom max-w-2xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                <LogIn className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Sign In Required</CardTitle>
              <CardDescription>
                You need to sign in to access this page.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={onNavigateToLogin} className="w-full" size="lg">
                <LogIn className="mr-2 h-4 w-4" />
                Go to Admin Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-muted/20 py-12 px-4">
        <div className="container-custom max-w-2xl mx-auto">
          <Card className="shadow-lg border-destructive">
            <CardHeader className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-2">
                <ShieldAlert className="h-6 w-6 text-destructive" />
              </div>
              <CardTitle className="text-2xl">Access Denied</CardTitle>
              <CardDescription>
                You do not have permission to access this page.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive">
                <AlertDescription>
                  This page is restricted to administrators only. If you believe you should have access, please contact support.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
