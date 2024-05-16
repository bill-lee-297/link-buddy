import BookmarkList from '@/components/BookmarkList';
import { getBookmarks } from '@/service/bookmark';

export default async function BookmarksArea() {
    const bookmarkData = await getBookmarks();

    if (bookmarkData?.status === 401) {
        return (
            <div className="flex h-[400px] w-full flex-col items-center justify-center text-center">
                링크버디는 하나의 계정으로 북마크를 관리할 수 있습니다. <br />
                브라우저마다 관리하기 힘들었던 북마크를 한 곳에서 관리해보세요. <br />
                <div className="mt-10 flex flex-row items-center justify-center gap-4">
                    <a
                        href="https://kukjin.notion.site/LinkBuddy-aa990d424ad545df8439a0d2c969294c?pvs=4"
                        className="mb-2 me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                        target="_blank"
                        rel="noreferrer"
                    >
                        링크버디란?
                    </a>
                    <a
                        href="/auth/signin"
                        className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        링크버디 시작하기
                    </a>
                </div>
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
