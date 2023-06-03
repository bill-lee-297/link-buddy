import { bookmark } from '@/service/bookmark';

type Props = {
    data: bookmark[];
    folderName: string;
};

export default function BookmarkList({ data, folderName }: Props) {
    return (
        <>
            {data.length === 0 ? (
                <div className="mt-6 flex justify-center text-lg text-gray-500">
                    추가된 즐겨찾기가 존재하지 않습니다. 자주 방문하는 웹페이지를 등록해보세요.
                </div>
            ) : (
                <div>{folderName}</div>
            )}

            <ul>
                {data.map((v) => (
                    <li key={v.bookmarkIdx}>
                        <p>{v.bookmarkName}</p>
                        <a href={v.bookmarkLink}>{v.bookmarkLink}</a>
                    </li>
                ))}
            </ul>
        </>
    );
}
