'use client';

import { getBookmarks } from '@/service/bookmark';

export default async function BookmarksArea() {
    const data = await getBookmarks();

    return <div>BookmarksArea</div>;
}
