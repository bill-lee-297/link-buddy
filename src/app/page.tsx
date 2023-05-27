import { useSession } from 'next-auth/react';

import BookmarksArea from '@/components/BookmarksArea';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col">
            <h1>LinkBuddy</h1>
            {/* @ts-expect-error Server Component */}
            <BookmarksArea />
        </main>
    );
}
