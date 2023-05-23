import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import addUser from '@/service/user';

export const AuthOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
        })
    ],
    callbacks: {
        async signIn({ user: { name, id, email } }) {
            if (!email) {
                return false;
            }
            await addUser({ id, name: name || '', email: email || '' });
            return true;
        },
        async session({ session }) {
            return session;
        }
    },
    pages: {
        signIn: '/auth/signin'
    }
};

const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };
