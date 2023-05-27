import BookmarkList from '@/components/BookmarkList';
import getBookmarks from '@/service/bookmark';

export default async function BookmarksArea() {
    const bookmarkData = await getBookmarks();

    console.log(bookmarkData);

    return bookmarkData ? (
        <>
            {bookmarkData.map(
                (data) =>
                    data.folderOrder === 0 && (
                        <>
                            <div key={data.folderIdx}>{data.folderName}</div>
                            <BookmarkList data={data.bookmarks} />
                        </>
                    )
            )}
        </>
    ) : (
        <div>Null</div>
    );
}
