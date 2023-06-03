import AddBookmark from '@/components/AddBookmark';
import BookmarksArea from '@/components/BookmarksArea';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col">
            <AddBookmark />

            {/* TODO: 상태에 따라서 문구를 보여주는 컴포넌트 생성 */}

            {/* @ts-expect-error Server Component */}
            <BookmarksArea />
        </main>
    );
}
