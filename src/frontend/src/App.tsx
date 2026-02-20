import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import ChatInterface from './components/ChatInterface';
import AdminDashboard from './components/AdminDashboard';
import { Toaster } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import { Shield, QrCode } from 'lucide-react';

const queryClient = new QueryClient();

function AppContent() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <QrCode className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Vehicle QR Connect AI</h1>
              <p className="text-xs text-muted-foreground">सुरक्षित और गोपनीय संचार</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAdmin(!isAdmin)}
            className="gap-2"
          >
            <Shield className="w-4 h-4" />
            {isAdmin ? 'User View' : 'Admin View'}
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {isAdmin ? <AdminDashboard /> : <ChatInterface />}
      </main>

      <footer className="border-t border-border/40 bg-card/30 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Vehicle QR Connect AI. All rights reserved.</p>
          <p className="mt-2">
            Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>

      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AppContent />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
