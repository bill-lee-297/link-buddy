import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { getProviders } from 'next-auth/react';

import { AuthOptions } from '@/app/api/auth/[...nextauth]/route';
import SignIn from '@/components/SignIn';

type Props = {
    searchParams: {
        callbackUrl: string;
    };
};

export default async function SignInPage({ searchParams: { callbackUrl } }: Props) {
    const session = await getServerSession(AuthOptions);

    if (session) {
        redirect('/');
    }

    const providers = (await getProviders()) ?? {};

    return <SignIn providers={providers} callbackUrl={callbackUrl ?? '/'} />;
}
