import BookmarkIcon from '@/components/Icons/BookmarkIcon';
import { bookmark } from '@/service/bookmark';

type Props = {
    data: bookmark[];
    folderName: string;
};

export default function BookmarkList({ data, folderName }: Props) {
    return (
        <div className="flex flex-col">
            {data.length === 0 ? (
                <div className="mt-6 flex justify-center text-lg text-gray-500">
                    추가된 즐겨찾기가 존재하지 않습니다. 자주 방문하는 사이트를 등록해보세요.
                </div>
            ) : (
                <div className="mb-4 text-3xl text-gray-600">{folderName}</div>
            )}

            <ul className="w-[300px]">
                {data.map((v) => (
                    <li key={v.bookmarkIdx} className="mb-6 flex items-center justify-start">
                        <div className="mr-2 h-[20px] w-[20px]">
                            {v.bookmarkImage === 'null' || v.bookmarkImage === '' ? (
                                <BookmarkIcon />
                            ) : (
                                <img
                                    src={v.bookmarkImage}
                                    alt={`${v.bookmarkName}의 favicon`}
                                    className="h-full w-full"
                                />
                            )}
                        </div>
                        <div className="w-full truncate">
                            <a href={v.bookmarkLink} className="text-sm font-semibold">
                                {v.bookmarkName}
                            </a>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
