'use client';

import { SyntheticEvent, useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Favicon from '@/components/Icons/Favicon';
import { API } from '@/lib/utils';
import { bookmark } from '@/service/bookmark';

type Props = {
    data: bookmark[];
    folderName: string;
};

const BookmarkList = ({ data, folderName }: Props) => {
    const router = useRouter();
    const [currentUrl, setCurrentUrl] = useState('');

    const handleDeleteBookmark = async (idx: number) => {
        if (window.confirm('삭제하시겠습니까?')) {
            const responseData = await API({
                endpoint: '/api/bookmark',
                method: 'DELETE',
                body: {
                    bookmarkIdx: idx
                }
            });

            if (responseData.status === 200) {
                alert('북마크가 삭제되었습니다.');
            } else {
                alert('삭제가 정상적으로 처리되지 않았습니다.');
            }
            router.refresh();
        }

        return true;
    };
    const handleImgError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = `${currentUrl}bookmark_ic.png`;
    };

    useEffect(() => {
        setCurrentUrl(window.location.href);
    }, []);

    return (
        <div className="flex flex-col">
            {data.length === 0 ? (
                <div className="mt-6 flex justify-center text-lg text-gray-500">
                    추가된 즐겨찾기가 존재하지 않습니다. 자주 방문하는 사이트를 등록해보세요.
                </div>
            ) : (
                <div className="mb-4 text-3xl text-gray-600">{folderName}</div>
            )}

            <ul className="w-[400px]">
                {data.map((v) => (
                    <li key={v.bookmarkIdx} className="mb-6 flex items-center justify-start">
                        <div className="mr-2 h-[20px] w-[20px]">
                            <Favicon bookmarkImage={v.bookmarkImage} bookmarkName={v.bookmarkName} />
                        </div>
                        <div className="w-[260px] truncate">
                            <a href={v.bookmarkLink} className="text-sm font-semibold">
                                {v.bookmarkName}
                            </a>
                        </div>
                        <div>
                            <button
                                type="button"
                                className="rounded-lg bg-red-700 px-3 py-2 text-xs font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                onClick={() => handleDeleteBookmark(v.bookmarkIdx)}
                            >
                                삭제
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookmarkList;
