import type {Metadata} from 'next';
import './globals.css'; // Global styles
import { ToastProvider } from '@/components/ToastProvider';

export const metadata: Metadata = {
  title: 'Studio Generator AI',
  description: 'AI Image Generator Studio',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="antialiased bg-zinc-950 text-zinc-50" suppressHydrationWarning>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
