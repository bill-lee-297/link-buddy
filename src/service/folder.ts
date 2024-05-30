import { db } from '@vercel/postgres';
import { getServerSession } from 'next-auth';

import { AuthOptions } from '@/app/api/auth/[...nextauth]/route';

type makeFolder = {
    name: string;
};

const makeFolder = async (folder: makeFolder) => {
    const session = await getServerSession(AuthOptions);
    const userEmail = session?.user?.email;

    if (!userEmail) {
        return {
            status: 401,
            message: '로그인이 필요한 기능입니다.'
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

    const insertResult = await client.sql`
        INSERT INTO folders 
            (folder_name, folder_order, folders_user_idx, folder_background_color) 
        VALUES 
            (${folder.name}, 0, ${userIdx}, '#fff')
    `;

    if (insertResult.rowCount === 1) {
        return {
            status: 'success',
            message: '폴더가 성공적으로 생성되었습니다.'
        };
    }

    return {
        status: 'error',
        message: '폴더 생성을 실패하였습니다.'
    };
};

export default makeFolder;
