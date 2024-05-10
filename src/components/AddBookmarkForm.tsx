'use client';

import React, { useEffect, useRef, useState } from 'react';

import { API } from '@/lib/utils';

type Props = {
    onClose: () => void;
    link: string;
};

export default function AddBookmarkForm({ onClose, link }: Props) {
    const nameElement = useRef(null);
    const [inputLink, setInputLink] = useState(link);
    const [name, setName] = useState('');
    const [faviconImag_, setFaviconImage] = useState('');

    const getCrawlingData = async (type: 'name' | 'favicon') => {
        console.log('exec');
        const result = await API({
            endpoint: '/api/crawling',
            method: 'GET',
            params: {
                inputLink
            }
        });

        console.log(result);

        if (result.status === 200) {
            if (type === 'name') {
                setName(result.data.title);
                return result.data.title;
            }
            if (type === 'favicon') {
                setFaviconImage(result.data.faviconURL);
                return result.data.faviconURL;
            }
        }
        return false;
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('handleUrlChange');
        setInputLink(e.target.value);
        setFaviconImage('');
    };

    const handleSubmit = async () => {
        if (inputLink.length === 0) {
            alert('북마크의 URL을 입력해주세요.');
            return;
        }
        if (name.length === 0) {
            alert('북마크의 이름을 입력해주세요.');
            return;
        }
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
            alert('북마크가 추가되었습니다.');
            onClose();
        }
    };

    useEffect(() => {
        if (nameElement.current) {
            (nameElement.current as HTMLInputElement).focus();
        }

        getCrawlingData('name');
    }, []);

    return (
        <section
            className="z-99 fixed left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-neutral-900/70"
            onClick={(e) => e.target === e.currentTarget && onClose()}
            role="none"
        >
            <div className="flex w-600 flex-col rounded-2xl bg-white p-4">
                <h1 className="text-xl">북마크 등록</h1>
                <div className="mt-6 flex flex-col gap-8">
                    <div className="flex flex-row items-center justify-start">
                        <div className="w-24">이름</div>
                        <input
                            type="text"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            placeholder="여기에 이름을 입력해주세요."
                            ref={nameElement}
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                        />
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
                    <div className="flex flex-row items-center justify-start">
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
                </div>
                <div className="mt-4 flex flex-row items-center justify-end gap-4">
                    <button
                        type="button"
                        className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
                        onClick={() => onClose()}
                    >
                        취소
                    </button>
                    <button
                        type="button"
                        className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                        onClick={() => handleSubmit()}
                    >
                        등록
                    </button>
                </div>
            </div>
        </section>
    );
}
