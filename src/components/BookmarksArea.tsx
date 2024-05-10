import BookmarkList from '@/components/BookmarkList';
import { getBookmarks } from '@/service/bookmark';

export default async function BookmarksArea() {
    const bookmarkData = await getBookmarks();

    if (bookmarkData?.status === 401) {
        return (
            <div className="flex h-[400px] w-full flex-col items-center justify-center text-center">
                링크버디는 하나의 계정으로 북마크를 관리할 수 있습니다. <br />
                브라우저 마다 관리하기 힘들었던 북마크를 한 곳에서 관리해보세요. <br />
                <br />
                <a href="/auth/signin">로그인 하기</a>
            </div>
        );
    }

    return (
        <div className="flex justify-center">
            {bookmarkData.length > 0 ? (
                bookmarkData.map((data) => (
                    <BookmarkList
                        key={data.bookmarks.bookmarkFolderIdx}
                        data={data.bookmarks}
                        folderName={data.folderName}
                    />
                ))
            ) : (
                <div>폴더가 존재하지 않습니다.</div>
            )}
        </div>
    );
}
