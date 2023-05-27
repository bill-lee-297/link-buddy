'use client';

import { signIn } from 'next-auth/react';
import { ClientSafeProvider } from 'next-auth/src/react/types';

type Props = {
    providers: Record<string, ClientSafeProvider>;
    callbackUrl: string;
};

export default function SignIn({ providers, callbackUrl }: Props) {
    return (
        <div className="mt-40 flex justify-center align-middle">
            {Object.values(providers).map((provider) => (
                <button
                    key={provider.name}
                    className="mb-10 w-1/4 rounded-lg border-2 border-gray-400 py-4 text-center font-medium text-gray-500"
                    onClick={() => signIn(provider.id, { callbackUrl })}
                >
                    Sign in with {provider.name}
                </button>
            ))}
        </div>
    );
}
