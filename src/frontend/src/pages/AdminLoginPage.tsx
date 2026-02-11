import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LogIn, LogOut, Loader2, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';
  const isError = loginStatus === 'loginError';

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.message === 'User is already authenticated') {
        await clear();
        setTimeout(() => login(), 300);
      }
    }
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-muted/20 py-12 px-4">
      <div className="container-custom max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Admin Access</CardTitle>
            <CardDescription>
              {isAuthenticated
                ? 'You are currently signed in'
                : 'Sign in to access admin features'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {isError && (
              <Alert variant="destructive">
                <AlertDescription>
                  Login failed. Please try again.
                </AlertDescription>
              </Alert>
            )}

            {!isAuthenticated ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground text-center">
                  Use Internet Identity to securely sign in to your admin account.
                </p>
                <Button
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                  className="w-full"
                  size="lg"
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign in with Internet Identity
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    Signed in as:
                  </p>
                  <p className="text-xs font-mono break-all bg-background p-2 rounded border">
                    {identity.getPrincipal().toString()}
                  </p>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
