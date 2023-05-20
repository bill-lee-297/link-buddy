'use client';

import { signIn } from 'next-auth/react';
import { ClientSafeProvider } from 'next-auth/src/react/types';

type Props = {
    providers: Record<string, ClientSafeProvider>;
    callbackUrl: string;
};

export default function SignIn({ providers, callbackUrl }: Props) {
    return (
        <>
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button onClick={() => signIn(provider.id, { callbackUrl })}>Sign in with {provider.name}</button>
                </div>
            ))}
        </>
    );
}
