'use client';

import React, { SyntheticEvent, useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import BookmarkInputForm from '@/components/BookmarkInputForm';
import Favicon from '@/components/Icons/Favicon';
import ModalPortal from '@/components/modal/ModalPortal';
import { API, isValidUrl } from '@/lib/utils';
import { bookmark } from '@/service/bookmark';
import { getSetting } from '@/service/setting';

type Props = {
    data: bookmark[];
    folderName: string;
};

const BookmarkList = ({ data, folderName }: Props) => {
    const router = useRouter();
    const [currentUrl, setCurrentUrl] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [openModalIdx, setOpenModalIdx] = useState(0);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [targetBlank, setTargetBlank] = useState(false);

    const handleDeleteBookmark = async (idx: number) => {
        if (window.confirm('삭제하시겠습니까?')) {
            setDeleteLoading(true);
            const responseData = await API({
                endpoint: '/api/bookmark',
                method: 'DELETE',
                body: {
                    bookmarkIdx: idx
                }
            });

            router.refresh();
            if (responseData.status === 200) {
                alert('북마크가 삭제되었습니다.');
            } else {
                alert('삭제가 정상적으로 처리되지 않았습니다.');
            }
            setDeleteLoading(false);
        }

        return true;
    };

    const handleEditBookmark = (idx: number) => {
        setOpenModal(true);
        setOpenModalIdx(idx);
    };

    const getSettingData = async () => {
        const response = await API({
            endpoint: '/api/setting',
            method: 'GET'
        });

        if (response.status === 200) {
            if (response.data?.target_blank) {
                setTargetBlank(response.data.target_blank === 'Y');
            }
        }
    };

    useEffect(() => {
        setCurrentUrl(window.location.href);
        getSettingData();
    }, []);

    return (
        <>
            {data.length < 1 && (
                <div className="mt-6 flex justify-center text-lg text-gray-500">
                    추가된 즐겨찾기가 존재하지 않습니다. 자주 방문하는 사이트를 등록해보세요.
                </div>
            )}

            {data.length > 0 && (
                <div className="flex flex-col rounded-2xl">
                    {folderName !== 'default' && <div className="px-6 py-2 text-3xl text-gray-600 ">folderName</div>}

                    {folderName !== 'default' && <div className="border-b-2" />}

                    <div className="">
                        <ul className="w-[430px]">
                            {data.map((v) => (
                                <li
                                    key={v.bookmarkIdx}
                                    className="flex items-center justify-between px-4 py-2 hover:bg-gray-100"
                                >
                                    <div className="flex flex-row">
                                        <a
                                            href={
                                                isValidUrl(v.bookmarkLink) ? v.bookmarkLink : `http://${v.bookmarkLink}`
                                            }
                                            className="flex flex-row"
                                            {...(targetBlank ? { target: '_blank', rel: 'noreferrer' } : {})}
                                        >
                                            <div className="mr-2 h-[20px] w-[20px]">
                                                <Favicon
                                                    bookmarkImage={v.bookmarkImage}
                                                    bookmarkName={v.bookmarkName}
                                                />
                                            </div>
                                            <div className="w-[260px] truncate">
                                                <span className="text-sm font-semibold">{v.bookmarkName}</span>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                                            onClick={() => handleEditBookmark(v.bookmarkIdx)}
                                        >
                                            수정
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            className="rounded-lg bg-red-700 px-3 py-2 text-xs font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                            onClick={() => handleDeleteBookmark(v.bookmarkIdx)}
                                            disabled={deleteLoading}
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {openModal && (
                        <ModalPortal>
                            <BookmarkInputForm
                                onClose={() => setOpenModal(false)}
                                bookmarkIdx={openModalIdx}
                                type="edit"
                            />
                        </ModalPortal>
                    )}
                </div>
            )}
        </>
    );
};

export default BookmarkList;
