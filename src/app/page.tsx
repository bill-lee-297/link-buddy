import AddBookmark from '@/components/AddBookmark';
import BookmarksArea from '@/components/BookmarksArea';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col">
            <AddBookmark />

            {/* @ts-expect-error Server Component */}
            <BookmarksArea />
        </main>
    );
}
