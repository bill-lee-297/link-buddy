import { db } from '@vercel/postgres';

type OAuthUser = {
    id: string;
    name?: string;
    email?: string;
    image?: string;
};

export default async function addUser(user: OAuthUser) {
    const client = await db.connect();

    const result = await client.sql`
            SELECT 
                user_idx, 
                user_name, 
                user_email, 
                user_id 
            FROM 
                users 
            WHERE 
                user_email = ${user.email};`;

    if (result.rows.length > 0) {
        return true;
    }

    const insertResult =
        await client.sql`INSERT INTO users (user_name, user_email, user_id) VALUES (${user.name}, ${user.email}, ${user.id}) RETURNING user_idx`;

    const userIdx = insertResult.rows[0].user_idx;

    await client.sql`INSERT INTO folders (folder_name, folder_order, folders_user_idx) VALUES ('default', 0, ${userIdx})`;

    return true;
}
