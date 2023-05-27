import { db } from '@vercel/postgres';
import _ from 'lodash';
import { getServerSession } from 'next-auth';

import { AuthOptions } from '@/app/api/auth/[...nextauth]/route';

export type bookmark = {
    bookmarkFolderIdx: number;
    bookmarkIdx: number;
    bookmarkImage: string;
    bookmarkLink: string;
    bookmarkName: string;
    bookmarkOrder: number;
};

type folder = {
    folderBackgroundColor: string;
    folderIdx: number;
    folderName: string;
    folderOrder: number;
};

export type bookmarks = bookmark & folder;

const getBookmarks = async () => {
    const session = await getServerSession(AuthOptions);
    const userEmail = session?.user?.email;

    const client = await db.connect();
    const data = await client.sql`
            SELECT 
                folder_idx,
                folder_name,
                folder_order,
                folder_background_color,
                bookmark_idx,
                bookmark_name,
                bookmark_link,
                bookmark_image,
                bookmark_order,
                bookmark_folder_idx
            FROM 
                users 
            LEFT JOIN 
                folders on users.user_idx = folders.folders_user_idx 
            LEFT JOIN 
                bookmarks on folders.folder_idx = bookmarks.bookmark_folder_idx 
            WHERE 
                users.user_email = ${userEmail}`;

    const bookmarkUnderScoreData = data.rows;

    const bookmarkData = bookmarkUnderScoreData.map((bookmark) => {
        return Object.fromEntries(Object.entries(bookmark).map(([key, value]) => [_.camelCase(key), value]));
    });

    const allFolderList = bookmarkData.map((data) => {
        const { folderIdx, folderName, folderOrder, folderBackgroundColor } = data;
        return {
            folderIdx,
            folderName,
            folderOrder,
            folderBackgroundColor
        };
    });

    const allBookmarkList = bookmarkData.map((data) => {
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

    return uniqueFolderList.map((folder) => {
        return {
            ...folder,
            bookmarks: allBookmarkList.filter((bookmark) => folder.folderIdx === bookmark.bookmarkFolderIdx)
        };
    });
};

export default getBookmarks;
