import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { AuthOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request: Request) {
    const session = await getServerSession(AuthOptions);

    const userEmail = session?.user?.email;

    const client = await db.connect();
    const data = await client.sql`
            SELECT 
                folder_idx as folderIdx,
                folder_name as folderName,
                folder_order as folderOrder,
                folder_background_color as folderBackgroundColor,
                bookmark_idx as bookmarkIdx,
                bookmark_name as bookmarkName,
                bookmark_link as bookmarkLink,
                bookmark_image as bookmarkImage,
                bookmark_order as bookmarkOrder,
                bookmark_folder_idx as bookmarkFolderIdx
            FROM 
                users 
            LEFT JOIN 
                folders on users.user_idx = folders.folders_user_idx 
            LEFT JOIN 
                bookmarks on folders.folder_idx = bookmarks.bookmark_folder_idx 
            WHERE 
                users.user_email = ${userEmail}`;

    return NextResponse.json({
        data
    });
}

export function Post(request: Request) {
    return false;
}
