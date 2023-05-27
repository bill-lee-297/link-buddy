import { bookmark } from '@/service/bookmark';

type Props = {
    data: bookmark[];
};

export default function BookmarkList({ data }: Props) {
    return (
        <ul>
            {data.map((v) => (
                <li key={v.bookmarkIdx}>
                    <p>{v.bookmarkName}</p>
                    <a href={v.bookmarkLink}>{v.bookmarkLink}</a>
                </li>
            ))}
        </ul>
    );
}
