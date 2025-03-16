import { Inter } from 'next/font/google';
import { Providers } from '../providers';
import { cn } from '../lib/utils';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Templatesia - Plataforma de Templates e IA',
  description: 'Desenvolva aplicações com nossa IA especializada em código, compartilhe seus templates com a comunidade e aprenda com outros desenvolvedores.',
  keywords: ['templates', 'desenvolvimento', 'ia', 'código', 'comunidade', 'programação'],
  authors: [{ name: 'Templatesia Team' }],
  creator: 'Templatesia',
  publisher: 'Templatesia',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Templatesia - Plataforma de Templates e IA',
    description: 'Desenvolva aplicações com nossa IA especializada em código.',
    url: 'https://templatesia.com',
    siteName: 'Templatesia',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Templatesia - Plataforma de Templates e IA',
    description: 'Desenvolva aplicações com nossa IA especializada em código.',
    creator: '@templatesia',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn(
        'min-h-screen bg-background font-sans antialiased',
        inter.className
      )}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
} 