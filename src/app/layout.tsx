import type { Metadata } from 'next';
import './globals.scss';
import { ToolbarProvider } from './ToolbarProvider';
import { SideNav } from './SideNav';
import { MobileNav } from './MobileNav';
import { MobileNotice } from './MobileNotice';

export const metadata: Metadata = {
  metadataBase: new URL('https://agentation.dev'),
  title: 'Agentation 한글 문서',
  description: '에이전트를 위한 시각적 피드백 도구',
  openGraph: {
    title: 'Agentation 한글 문서',
    description: '에이전트를 위한 시각적 피드백 도구',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Agentation 툴바',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agentation 한글 문서',
    description: '에이전트를 위한 시각적 피드백 도구',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Cascadia+Code:ital@1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <MobileNotice />
        <MobileNav />
        <SideNav />
        <main className="main-content">{children}</main>
        <ToolbarProvider />
      </body>
    </html>
  );
}
