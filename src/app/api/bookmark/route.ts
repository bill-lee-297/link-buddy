import { NextResponse } from 'next/server';

import { deleteBookmark, postBookmarks } from '@/service/bookmark';

const POST = async (request: Request) => {
    const req = await request.json();
    const { url, name, order, faviconImage } = req;

    const responseData = await postBookmarks({ url, name, order, faviconImage });

    if (responseData.status === 'success') {
        return NextResponse.json({
            data: responseData.message
        });
    }

    return NextResponse.json({
        data: responseData.message
    });
};

const DELETE = async (request: Request) => {
    const req = await request.json();
    const { bookmarkIdx } = req;

    const responseData = await deleteBookmark(bookmarkIdx);

    if (responseData.status === 'success') {
        return NextResponse.json({
            data: responseData.message
        });
    }

    return NextResponse.json({
        data: responseData.message
    });
};

export { POST, DELETE };
