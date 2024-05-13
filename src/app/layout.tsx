import { Inter } from 'next/font/google';

import './globals.css';

import Header from '@/components/Header';
import AuthContext from '@/context/AuthContext';

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
        </html>
    );
}
