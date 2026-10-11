import { useEffect, useState, useRef } from 'react';
import { Download, X, Zap, WifiOff, Monitor } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [installing, setInstalling] = useState(false);
  const [installed, setInstalled] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Don't show if already installed (running as standalone PWA)
    if (window.matchMedia('(display-mode: standalone)').matches) return;
    // Don't show if user already dismissed recently
    const dismissed = localStorage.getItem('pwa-banner-dismissed');
    if (dismissed) {
      const dismissedAt = parseInt(dismissed, 10);
      // Re-show after 7 days
      if (Date.now() - dismissedAt < 7 * 24 * 60 * 60 * 1000) return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show banner after a short delay so it doesn't feel intrusive
      timerRef.current = setTimeout(() => setShowBanner(true), 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => {
      setShowBanner(false);
      setInstalled(true);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    setInstalling(true);
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstalled(true);
    }
    setShowBanner(false);
    setDeferredPrompt(null);
    setInstalling(false);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem('pwa-banner-dismissed', Date.now().toString());
  };

  if (!showBanner && !installed) return null;

  // Success toast after install
  if (installed) {
    return (
      <div className="fixed bottom-6 right-6 z-50 bg-green-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in">
        <Zap className="w-5 h-5" />
        <span className="font-medium text-sm">SoftBee PDF installed successfully!</span>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-sm animate-slide-up">
      {/* Backdrop blur card */}
      <div className="bg-white dark:bg-zinc-900 border border-amber-200 dark:border-amber-700 shadow-2xl rounded-t-2xl sm:rounded-2xl overflow-hidden">
        {/* Amber top accent bar */}
        <div className="h-1 bg-gradient-to-r from-amber-400 via-rose-500 to-amber-400" />

        <div className="p-4">
          {/* Header row */}
          <div className="flex items-start gap-3">
            {/* App icon */}
            <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center shadow-lg flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                <path d="M4 4L21 12H9L4 4Z" fill="#F43F5E" />
                <path d="M4 20L21 12H9L4 20Z" fill="white" />
              </svg>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-bold text-zinc-900 dark:text-white text-sm leading-tight">
                  Install SoftBee PDF
                </p>
                <button
                  onClick={handleDismiss}
                  className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 ml-2 flex-shrink-0 p-0.5"
                  aria-label="Dismiss"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Add to your Windows desktop for quick access
              </p>
            </div>
          </div>

          {/* Feature pills */}
          <div className="flex gap-2 mt-3 flex-wrap">
            <span className="inline-flex items-center gap-1 text-xs bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 px-2 py-1 rounded-full border border-amber-200 dark:border-amber-800">
              <WifiOff className="w-3 h-3" /> Works Offline
            </span>
            <span className="inline-flex items-center gap-1 text-xs bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-400 px-2 py-1 rounded-full border border-rose-200 dark:border-rose-800">
              <Monitor className="w-3 h-3" /> Windows App
            </span>
            <span className="inline-flex items-center gap-1 text-xs bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-2 py-1 rounded-full border border-zinc-200 dark:border-zinc-700">
              <Zap className="w-3 h-3" /> Instant Access
            </span>
          </div>

          {/* Install button */}
          <button
            onClick={handleInstall}
            disabled={installing}
            className="mt-3 w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold text-sm py-2.5 px-4 rounded-xl transition-colors disabled:opacity-70"
          >
            <Download className="w-4 h-4" />
            {installing ? 'Installing…' : 'Install Free App'}
          </button>

          <p className="text-center text-xs text-zinc-400 dark:text-zinc-500 mt-2">
            No account needed • 100% free • Uninstall anytime
          </p>
        </div>
      </div>
    </div>
  );
}
