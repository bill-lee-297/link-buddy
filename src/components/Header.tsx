'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function Header() {
    const { data: session } = useSession();

    return (
        <header className="flex w-full justify-center border-b-2 border-gray-200 px-10 py-6">
            <div className="h-30 flex w-full max-w-[1200px] items-center justify-between">
                <div className="flex items-center">
                    <a className="font text-lg font-semibold" href="/">Link Buddy</a>
                </div>
                <div className="">
                    <nav className="flex items-center">
                        <ul className="flex items-center gap-4">
                            {session?.user?.image && (
                                <li className="">
                                    <img
                                        className="rounded-2xl"
                                        src={session?.user?.image}
                                        width="30"
                                        height="30"
                                        alt="profile"
                                    />
                                </li>
                            )}
                            <li className="">{session ? session.user?.name : ''}</li>
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
            </div>
        </header>
    );
}
