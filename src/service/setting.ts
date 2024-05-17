import { db } from '@vercel/postgres';
import { getServerSession } from 'next-auth';

import { AuthOptions } from '@/app/api/auth/[...nextauth]/route';

type Props = {
    newTab: string;
};

const getSetting = async () => {
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
            SELECT target_blank FROM settings WHERE user_idx = (SELECT user_idx FROM users WHERE user_email = ${userEmail})`;

    if (data.rows.length === 0) {
        return {
            status: 'error',
            message: '오류가 발생하였습니다.'
        };
    }

    return {
        status: 'success',
        data: data.rows[0]
    };
};

const setSetting = async ({ newTab }: Props) => {
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
                user_idx
            FROM 
                users  
            WHERE 
                users.user_email = ${userEmail}`;

    const userData = data.rows[0];

    if (!userData) {
        return {
            status: 'error',
            message: '사용자 정보를 찾을 수 없습니다.'
        };
    }

    const result = await client.sql`
            UPDATE settings SET target_blank = ${newTab} WHERE user_idx = ${userData.user_idx}`;

    if (result.rowCount === 0) {
        return {
            status: 'error',
            message: '설정을 바꾸지 못했습니다.'
        };
    }

    return {
        status: 'success',
        message: '설정이 변경되었습니다.'
    };
};

export { getSetting, setSetting };
