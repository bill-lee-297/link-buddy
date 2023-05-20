'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function Header() {
    const { data: session } = useSession();

    return (
        <header className="flex h-20 w-full items-center justify-between bg-amber-100 px-10 py-6">
            <div className="flex items-center">
                <p className="font text-lg font-semibold">Link Buddy</p>
            </div>
            <div className="">
                <nav className="flex items-center">
                    <ul className="flex gap-4">
                        <li className="">
                            {session ? session.user?.name : ''}
                            <p>profile</p>
                        </li>
                        <li>
                            {session ? (
                                <button onClick={() => signOut()}>Sign Out</button>
                            ) : (
                                <button onClick={() => signIn()}>Sign In</button>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
