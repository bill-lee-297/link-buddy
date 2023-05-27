import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';

import { AuthOptions } from '@/app/api/auth/[...nextauth]/route';
import { getApi } from '@/lib/utils';

type bookmarks = {
    bookmarkFolderIdx: number;
    bookmarkIdx: number;
    bookmarkImage: string;
    bookmarkLink: string;
    bookmarkName: string;
    bookmarkOrder: number;
    folderBackgroundColor: string;
    folderIdx: number;
    folderName: string;
    folderOrder: number;
};

const getBookmarks = async () => {
    const session = await getServerSession(AuthOptions);

    if (!session?.user?.email) {
        return [];
    }

    const bookmarkData: bookmarks[] = await getApi('/api/bookmark');

    const allFolderList = bookmarkData.map((data: bookmarks) => {
        const { folderIdx, folderName, folderOrder, folderBackgroundColor } = data;
        return {
            folderIdx,
            folderName,
            folderOrder,
            folderBackgroundColor
        };
    });

    const allBookmarkList = bookmarkData.map((data: bookmarks) => {
        const { bookmarkFolderIdx, bookmarkIdx, bookmarkImage, bookmarkLink, bookmarkName, bookmarkOrder } = data;

        return {
            bookmarkFolderIdx,
            bookmarkIdx,
            bookmarkImage,
            bookmarkLink,
            bookmarkName,
            bookmarkOrder
        };
    });

    const uniqueFolderList = [...new Map(allFolderList.map((folder) => [folder.folderIdx, folder])).values()];

    const result = uniqueFolderList.map((folder) => {
        return {
            ...folder,
            bookmarks: allBookmarkList.filter((bookmark) => folder.folderIdx === bookmark.bookmarkFolderIdx)
        };
    });

    return result;
};

export { getBookmarks };
