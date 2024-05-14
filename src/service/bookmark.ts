import { db } from '@vercel/postgres';
import _ from 'lodash';
import { getServerSession } from 'next-auth';
import { BiLogIn } from 'react-icons/bi';

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

type insertBookmark = {
    url: string;
    name: string;
    order: number;
    faviconImage: string;
};

type updateBookmark = {
    bookmarkIdx: number;
    url: string;
    name: string;
};

export type bookmarks = bookmark & folder;

const getBookmarkDetail = async (bookmarkIdx: number) => {
    const session = await getServerSession(AuthOptions);
    const userEmail = session?.user?.email;

    if (!userEmail) {
        return {
            status: 401,
            message: '로그인이 필요한 기능입니다.'
        };
    }

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
                users.user_email = ${userEmail} AND bookmarks.bookmark_idx = ${bookmarkIdx}`;

    const bookmarkData = data.rows[0];

    return {
        status: 'success',
        data: bookmarkData
    };
};

const getBookmarks = async () => {
    const session = await getServerSession(AuthOptions);
    const userEmail = session?.user?.email;

    if (!userEmail) {
        return {
            status: 401,
            message: '로그인이 필요한 기능입니다.'
        };
    }

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

const postBookmarks = async (bookmark: insertBookmark) => {
    const session = await getServerSession(AuthOptions);
    const userEmail = session?.user?.email;

    if (!userEmail) {
        return {
            status: 'error',
            message: '로그인 정보가 필요합니다.'
        };
    }

    const client = await db.connect();

    const result = await client.sql`
            SELECT 
                user_idx,
                folder_idx
            FROM 
                users as users
            LEFT JOIN
                folders as folders 
                ON users.user_idx = folders.folders_user_idx
            WHERE 
                user_email = ${userEmail} AND folders.folder_order = 0`;

    if (result.rows.length === 0) {
        return {
            status: 'error',
            message: '사용자 정보와 폴더 정보를 찾을 수 없습니다.'
        };
    }

    const userIdx = result.rows[0].user_idx;
    const bookmark_name = bookmark.name;
    const bookmark_link = bookmark.url;
    const bookmark_image = bookmark.faviconImage;
    const bookmark_order = bookmark.order;
    const bookmark_folder_idx = result.rows[0].folder_idx;

    const data = await client.sql`
        INSERT INTO bookmarks
            (bookmark_name, bookmark_link, bookmark_image, bookmark_order, bookmark_folder_idx, bookmark_user_idx)
        VALUES
            (${bookmark_name}, ${bookmark_link}, ${bookmark_image}, ${bookmark_order}, ${bookmark_folder_idx}, ${userIdx})`;

    if (data.rowCount === 1) {
        return {
            status: 'success',
            message: '성공적으로 등록되었습니다.'
        };
    }

    return {
        status: 'error',
        message: '등록이 실패하였습니다.'
    };
};

const putBookmark = async (bookmark: updateBookmark) => {
    const session = await getServerSession(AuthOptions);
    const userEmail = session?.user?.email;

    if (!userEmail) {
        return {
            status: 'error',
            message: '로그인 정보가 필요합니다.'
        };
    }

    const client = await db.connect();
    const result = await client.sql`
            SELECT 
                user_idx
            FROM 
                users as users
            LEFT JOIN
                bookmarks as bookmarks ON users.user_idx = bookmarks.bookmark_user_idx
            WHERE 
                users.user_email = ${userEmail} AND bookmarks.bookmark_idx  = ${bookmark.bookmarkIdx}`;

    if (result.rows.length === 0) {
        return {
            status: 'error',
            message: '사용자 정보와 일치하지 않습니다.'
        };
    }

    const data = await client.sql`
                UPDATE 
                    bookmarks 
                SET 
                    bookmark_name = ${bookmark.name}, 
                    bookmark_link = ${bookmark.url} 
                WHERE 
                    bookmark_idx = ${bookmark.bookmarkIdx}`;

    if (data.rowCount === 1) {
        return {
            status: 'success',
            message: '성공적으로 수정되었습니다.'
        };
    }

    return {
        status: 'error',
        message: '수정이 실패하였습니다.'
    };
};

const deleteBookmark = async (bookmarkIdx: number) => {
    const session = await getServerSession(AuthOptions);
    const userEmail = session?.user?.email;

    if (!userEmail) {
        return {
            status: 'error',
            message: '로그인 정보가 필요합니다.'
        };
    }

    const client = await db.connect();

    const result = await client.sql`
            SELECT 
                user_idx
            FROM 
                users as users
            WHERE 
                user_email = ${userEmail}`;

    if (result.rows.length === 0) {
        return {
            status: 'error',
            message: '사용자 정보를 찾을 수 없습니다.'
        };
    }

    const userIdx = result.rows[0].user_idx;

    const data = await client.sql`
        DELETE FROM bookmarks WHERE bookmark_idx = ${bookmarkIdx} AND bookmark_user_idx = ${userIdx}`;

    if (data.rowCount === 1) {
        return {
            status: 'success',
            message: '성공적으로 삭제되었습니다.'
        };
    }

    return {
        status: 'error',
        message: '삭제를 실패하였습니다.'
    };
};

export { getBookmarkDetail, getBookmarks, postBookmarks, deleteBookmark, putBookmark };
