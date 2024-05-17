'use client';

import React, { useEffect, useRef, useState } from 'react';

import ModalSpinner from '@/components/modal/ModalSpinner';
import { API, isValidUrl } from '@/lib/utils';

type Props = {
    onClose: () => void;
    link?: string;
    type: 'register' | 'edit';
    bookmarkIdx?: number;
};

export default function BookmarkInputForm({ onClose, link, type, bookmarkIdx }: Props) {
    const nameElement = useRef(null);
    const submitBtnElement = useRef(null);
    const [inputLink, setInputLink] = useState(link);
    const [name, setName] = useState('');
    const [faviconImag, setFaviconImage] = useState('');
    const [nameLoading, setNameLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);

    const getCrawlingData = async (type: 'name' | 'favicon') => {
        if (type === 'name') {
            setNameLoading(true);
        }
        try {
            const result = await API({
                endpoint: '/api/crawling',
                method: 'GET',
                params: {
                    inputLink
                }
            });

            if (result.status === 200) {
                if (type === 'name') {
                    setName(result.data.title);
                    setNameLoading(false);
                    return result.data.title;
                }
                if (type === 'favicon') {
                    setFaviconImage(result.data.faviconURL);
                    return result.data.faviconURL;
                }
            }
        } catch (e) {
            setNameLoading(false);
        }

        return true;
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputLink(e.target.value);
        setFaviconImage('');
    };

    const handleSubmit = async (type: 'register' | 'edit') => {
        if (inputLink.length === 0) {
            alert('북마크의 URL을 입력해주세요.');
            return;
        }
        if (!isValidUrl(inputLink)) {
            alert('올바르지 않은 URL 입니다.');
            return;
        }

        if (name.length === 0) {
            alert('북마크의 이름을 입력해주세요.');
            return;
        }
        setSubmitLoading(true);

        try {
            if (type === 'register') {
                const favicon = await getCrawlingData('favicon');

                const responseData = await API({
                    endpoint: '/api/bookmark',
                    method: 'POST',
                    body: {
                        url: inputLink,
                        name,
                        order: 0,
                        faviconImage: favicon
                    }
                });
                if (responseData.status === 200) {
                    onClose();
                    alert('북마크가 추가되었습니다.');
                    return;
                }
            } else {
                const responseData = await API({
                    endpoint: '/api/bookmark',
                    method: 'PUT',
                    body: {
                        bookmarkIdx,
                        url: inputLink,
                        name
                    }
                });
                if (responseData.status === 200) {
                    onClose();
                    alert('북마크가 변경되었습니다.');
                    return;
                }
            }
        } catch (error) {
            alert('오류가 발생하였습니다.');
        }

        setSubmitLoading(false);
    };

    const keyModalClose = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }
        if (e.key === 'Enter') {
            if (!nameLoading && !submitLoading) {
                submitBtnElement.current?.click();
            }
        }
    };

    const getBookmarkData = async () => {
        setSubmitLoading(true);

        const result = await API({
            endpoint: `/api/bookmark`,
            method: 'GET',
            params: {
                bookmarkIdx
            }
        });

        const { bookmark_name, bookmark_link } = result.data;

        setName(bookmark_name);
        setInputLink(bookmark_link);
        setSubmitLoading(false);
    };

    useEffect(() => {
        if (type === 'edit') {
            getBookmarkData();
        }
    }, [bookmarkIdx]);

    useEffect(() => {
        if (nameElement.current) {
            (nameElement.current as HTMLInputElement).focus();
        }

        getCrawlingData('name');

        window.addEventListener('keydown', keyModalClose);
        return () => window.removeEventListener('keydown', keyModalClose);
    }, []);

    return (
        <section
            className="z-99 fixed left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-neutral-900/70"
            onClick={(e) => e.target === e.currentTarget && onClose()}
            role="none"
        >
            <div className="display relative flex w-600 flex-col rounded-2xl bg-white">
                <div className="p-4">
                    <h1 className="text-xl">북마크 {type === 'register' ? '등록' : '수정'}</h1>
                </div>
                <div className="border-b-2 border-b-gray-200 " />
                <div className="flex flex-col gap-8 px-4 py-6">
                    <div className="flex flex-row items-center justify-start">
                        <div className="w-24">이름</div>
                        {nameLoading ? (
                            <div role="status">
                                <svg
                                    aria-hidden="true"
                                    className="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"
                                    />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        ) : (
                            <input
                                type="text"
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                placeholder="여기에 이름을 입력해주세요."
                                ref={nameElement}
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                required
                            />
                        )}
                    </div>
                    <div className="flex flex-row items-center justify-start">
                        <div className="w-24">폴더 선택</div>
                        <select
                            id="folder"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                        >
                            <option value="0" selected>
                                Default
                            </option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-row  items-center justify-start">
                            <div className="w-24">URL</div>
                            <input
                                value={inputLink}
                                onChange={handleUrlChange}
                                type="text"
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                placeholder="여기에 링크를 입력해주세요."
                                required
                            />
                        </div>
                        {!isValidUrl(inputLink) && (
                            <div className="mt-2 flex flex-row items-center justify-end ">
                                {/* <div className="mr-2 text-right text-gray-600">URL을 확인해주세요.</div> */}
                                <a
                                    className="text-sm text-blue-500 underline"
                                    href="https://www.notion.so/kukjin/LinkBuddy-aa990d424ad545df8439a0d2c969294c?pvs=4#7ec653a3bebf473db3fe3c913e5c208b"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    URL은 이렇게 입력해주세요!
                                </a>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-row items-center justify-end gap-4 px-4 py-6">
                    <button
                        type="button"
                        className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
                        onClick={() => onClose()}
                    >
                        취소
                    </button>
                    <button
                        ref={submitBtnElement}
                        type="button"
                        className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                        onClick={() => handleSubmit(type)}
                        disabled={submitLoading}
                    >
                        {type === 'register' ? '등록' : '수정'}
                    </button>
                </div>
                {submitLoading && <ModalSpinner />}
            </div>
        </section>
    );
}
