import BookmarkList from '@/components/BookmarkList';
import getBookmarks from '@/service/bookmark';

export default async function BookmarksArea() {
    const bookmarkData = await getBookmarks();

    return bookmarkData ? (
        <>
            {bookmarkData.map(
                (data) =>
                    data.folderOrder === 0 && (
                        <>
                            <BookmarkList data={data.bookmarks} folderName={data.folderName} />
                        </>
                    )
            )}
        </>
    ) : (
        <div>Null</div>
    );
}
