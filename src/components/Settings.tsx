import React, { useEffect, useLayoutEffect, useState } from 'react';

import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';

import ModalSpinner from '@/components/modal/ModalSpinner';
import { API } from '@/lib/utils';

type Props = {
    onClose: () => void;
};

const Settings = ({ onClose }: Props) => {
    const { data: session } = useSession();
    const [imgSrc, setImgSrc] = useState(session?.user?.image || '');
    const [currentUrl, setCurrentUrl] = useState('');
    const [newTabValue, setNewTabValue] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);

    const getSettingData = async () => {
        setSubmitLoading(true);
        try {
            const response = await API({
                endpoint: '/api/setting',
                method: 'GET'
            });

            if (response.status === 200) {
                if (response.data?.target_blank) {
                    setNewTabValue(response.data.target_blank === 'Y');
                } else {
                    alert('오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.');
                }
            }
        } catch (e) {
            alert('오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.');
        }

        setSubmitLoading(false);
    };

    const handleNewTab = async () => {
        const newTab = newTabValue ? 'N' : 'Y';
        setSubmitLoading(true);
        setNewTabValue((newTabValue) => !newTabValue);

        try {
            await API({
                endpoint: '/api/setting',
                method: 'PUT',
                body: {
                    newTab
                }
            });
        } catch (e) {
            alert('오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.');
        }

        setSubmitLoading(false);
    };

    useEffect(() => {
        setCurrentUrl(window.location.href);
        getSettingData();
    }, []);

    useEffect(() => {
        if (session?.user?.image) {
            setImgSrc(session?.user?.image || '');
        }
    }, [session]);

    return (
        <div>
            <section
                className="z-99 fixed left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-neutral-900/70"
                onClick={(e) => e.target === e.currentTarget && onClose()}
                role="none"
            >
                <div className="display relative flex w-400 flex-col rounded-2xl bg-white">
                    <div className="p-4">
                        <h1 className="text-xl">설정</h1>
                    </div>
                    <div className="border-b-2 border-b-gray-200 " />
                    <div className="flex flex-col gap-8 px-4 py-6">
                        <div className="flex flex-row items-center justify-between">
                            <div className="w-100">북마크를 새탭으로 열기</div>
                            <label className="inline-flex cursor-pointer items-center">
                                {newTabValue ? (
                                    <input
                                        type="checkbox"
                                        value=""
                                        className="peer sr-only"
                                        onChange={handleNewTab}
                                        checked
                                    />
                                ) : (
                                    <input type="checkbox" value="" className="peer sr-only" onChange={handleNewTab} />
                                )}

                                <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800" />
                            </label>
                        </div>
                    </div>

                    <div className="border-b-2 border-b-gray-200 " />

                    <div className="flex flex-row items-center justify-between px-4 py-4">
                        <div className="flex flex-row items-center gap-4">
                            {session && (
                                <>
                                    {/* {(session?.user?.image || imgSrc) && ( */}
                                    {/*    <Image */}
                                    {/*        style={{ borderRadius: '50%' }} */}
                                    {/*        width="30" */}
                                    {/*        height="30" */}
                                    {/*        src={session?.user?.image} */}
                                    {/*        alt="profile" */}
                                    {/*        onError={() => setImgSrc(`${currentUrl}user_ic.png`)} */}
                                    {/*        unoptimized */}
                                    {/*    /> */}
                                    {/* )} */}
                                    {session?.user?.name && <div>{session.user?.name || ''}</div>}
                                </>
                            )}
                        </div>
                        <button
                            type="button"
                            className="rounded-lg bg-red-700 px-3 py-2 text-xs font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            onClick={() => signOut()}
                        >
                            로그아웃
                        </button>
                    </div>
                    {submitLoading && <ModalSpinner />}
                </div>
            </section>
        </div>
    );
};

export default Settings;
