'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';

import ModalPortal from '@/components/modal/ModalPortal';
import Settings from '@/components/Settings';

export default function Header() {
    const { data: session } = useSession();
    const [openModal, setOpenModal] = useState(false);
    const closeModal = () => {
        // window.location.reload();
        setOpenModal(false);
    };

    return (
        <header className="flex w-full justify-center border-b-2 border-gray-200 px-10 py-6">
            <div className="h-30 flex w-full max-w-[1200px] items-center justify-between">
                <div className="flex items-center">
                    <a className="font font-rockSalt text-lg font-semibold" href="/">
                        Link Buddy
                    </a>
                </div>
                <div className="">
                    <nav className="flex items-center">
                        <ul className="flex flex-row items-center justify-end">
                            {session && (
                                <>
                                    {/* {session.user?.image && ( */}
                                    {/*    <li className=""> */}
                                    {/*        <img */}
                                    {/*            className="rounded-2xl" */}
                                    {/*            src={session?.user?.image} */}
                                    {/*            width="30" */}
                                    {/*            height="30" */}
                                    {/*            alt="profile" */}
                                    {/*        /> */}
                                    {/*    </li> */}
                                    {/* )} */}
                                    {/* <li className="">{session.user?.name || ''}</li> */}
                                    <li onClick={() => setOpenModal(true)} className="cursor-pointer">
                                        <img className="h-[20px] w-[20px]" src="/setting_ic.png" alt="setting button" />
                                    </li>
                                </>
                            )}
                            <li>{!session && <button onClick={() => signIn()}>로그인</button>}</li>
                        </ul>
                    </nav>
                </div>
            </div>
            {openModal && (
                <ModalPortal>
                    <Settings onClose={() => closeModal()} />
                </ModalPortal>
            )}
        </header>
    );
}
