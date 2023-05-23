import { db } from '@vercel/postgres';

type OAuthUser = {
    id: string;
    name?: string;
    email?: string;
    image?: string;
};

export default async function addUser(user: OAuthUser) {
    const client = await db.connect();

    const result = await client.sql`SELECT * FROM users WHERE user_email = ${user.email};`;

    if (result.rows.length > 0) {
        return true;
    }
    await client.sql`INSERT INTO users (user_name, user_email, user_id) VALUES (${user.name}, ${user.email}, ${user.id})`;

    return true;
}
