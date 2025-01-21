import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Geo Meta Map',
  description:
    'A tool to help visualise and learn the basic meta information for geography pin-pointing games like GeoGuessr or GeoTastic',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='antialiased dark'>{children}</body>
    </html>
  );
}
