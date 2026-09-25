import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DSO · Liquid Glass Study',
  description: 'Interactive Dubai Silicon Oasis interface and liquid-dom rendering study',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
