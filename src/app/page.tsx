import { getServerSession } from 'next-auth';

import { AuthOptions } from '@/app/api/auth/[...nextauth]/route';
import AddBookmark from '@/components/AddBookmark';
import BookmarksArea from '@/components/BookmarksArea';

export const dynamic = 'force-dynamic';

export default async function Home() {
    const session = await getServerSession(AuthOptions);

    return (
        <main className="flex min-h-screen flex-col">
            {session && <AddBookmark />}

            {/* @ts-expect-error Server Component */}
            <BookmarksArea />
        </main>
    );
}
