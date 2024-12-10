// app/layout.tsx (Server-side context)
import { Metadata } from 'next';
import { Providers } from '@/components/Providers';
import { Roboto } from 'next/font/google';
import './globals.css';

const roboto = Roboto({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Mohammed Sahil Khan - Software Developer Portfolio',
  description: 'A showcase of projects and skills by Mohammed Sahil Khan',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${roboto.variable} font-sans bg-white text-black`}>
        {/* Wrap the children with Providers to maintain context, such as theme management */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
