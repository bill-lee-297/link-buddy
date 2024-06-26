import { Inter } from 'next/font/google';

import './globals.css';

import Header from '@/components/Header';
import AuthContext from '@/context/AuthContext';
import GoogleAnalytics from '@/components/GoogleAnalytics';

import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'LinkBuddy - Bookmark Manager',
    description: '북마크(즐겨찾기)를 하나의 계정으로 관리해보세요.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inter.className}`}>
                <AuthContext>
                    <main className="mx-auto">
                        <Header />
                        <div className="mx-auto max-w-[1200px]">{children}</div>
                    </main>
                </AuthContext>

                <div id="portal" />
            </body>
            <GoogleAnalytics gaId="G-L9C7BEEQEV" />
            <Analytics />
            <SpeedInsights />
        </html>
    );
}
