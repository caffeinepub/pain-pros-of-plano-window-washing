import { AdminAuthGate } from '../components/AdminAuthGate';
import { useAdminQuotes } from '../hooks/useAdminQuotes';
import { useMaintenanceMode, useSetMaintenanceMode } from '../hooks/useMaintenanceMode';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Loader2, FileText, AlertCircle, Construction, User } from 'lucide-react';

interface ViewQuotesPageProps {
  onNavigate: (page: 'home' | 'quote' | 'otherJobs' | 'adminLogin' | 'viewQuotes') => void;
}

export default function ViewQuotesPage({ onNavigate }: ViewQuotesPageProps) {
  return (
    <AdminAuthGate onNavigateToLogin={() => onNavigate('adminLogin')}>
      <ViewQuotesContent />
    </AdminAuthGate>
  );
}

function ViewQuotesContent() {
  const { data: quotes, isLoading, error } = useAdminQuotes();
  const { data: isMaintenanceMode, isLoading: maintenanceLoading } = useMaintenanceMode();
  const setMaintenanceMode = useSetMaintenanceMode();

  const handleMaintenanceToggle = async (checked: boolean) => {
    try {
      await setMaintenanceMode.mutateAsync(checked);
    } catch (error) {
      console.error('Failed to toggle maintenance mode:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-muted/20 py-12 px-4">
        <div className="container-custom max-w-6xl mx-auto">
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center space-y-3">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                <p className="text-muted-foreground">Loading quotes...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-muted/20 py-12 px-4">
        <div className="container-custom max-w-6xl mx-auto">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load quotes: {error instanceof Error ? error.message : 'Unknown error'}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-muted/20 py-12 px-4">
      <div className="container-custom max-w-6xl mx-auto space-y-6">
        {/* Maintenance Mode Control */}
        <Card className="shadow-lg border-warning/20">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
                <Construction className="h-5 w-5 text-warning" />
              </div>
              <div>
                <CardTitle className="text-xl">Site Maintenance Mode</CardTitle>
                <CardDescription>
                  Control public access to the website
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="space-y-1">
                <Label htmlFor="maintenance-mode" className="text-base font-medium cursor-pointer">
                  Maintenance Mode
                </Label>
                <p className="text-sm text-muted-foreground">
                  {isMaintenanceMode
                    ? 'Public pages are currently hidden. Only admins can access the site.'
                    : 'Public pages are accessible to all visitors.'}
                </p>
              </div>
              <Switch
                id="maintenance-mode"
                checked={isMaintenanceMode ?? false}
                onCheckedChange={handleMaintenanceToggle}
                disabled={maintenanceLoading || setMaintenanceMode.isPending}
              />
            </div>
            {setMaintenanceMode.isPending && (
              <div className="mt-3 flex items-center text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Updating maintenance mode...
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quote Requests */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">Quote Requests</CardTitle>
                <CardDescription>
                  {quotes && quotes.length > 0
                    ? `${quotes.length} quote ${quotes.length === 1 ? 'request' : 'requests'} received`
                    : 'No quote requests yet'}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {!quotes || quotes.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No quote requests have been submitted yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>ZIP Code</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead className="text-center">Windows</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead>Submitted By</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quotes.map((quote, index) => (
                      <TableRow key={`${quote.createdBy}-${index}`}>
                        <TableCell className="font-medium">
                          {quote.firstName} {quote.lastName}
                        </TableCell>
                        <TableCell>{quote.zipCode.toString()}</TableCell>
                        <TableCell>{quote.address}</TableCell>
                        <TableCell className="text-center">{quote.windowNumber.toString()}</TableCell>
                        <TableCell className="max-w-xs truncate">
                          {quote.notes || <span className="text-muted-foreground italic">None</span>}
                        </TableCell>
                        <TableCell>
                          {quote.createdBy === 'anonymous' ? (
                            <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                              <User className="h-3 w-3" />
                              Anonymous
                            </Badge>
                          ) : (
                            <span className="text-xs font-mono max-w-[150px] truncate block" title={quote.createdBy}>
                              {quote.createdBy}
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
