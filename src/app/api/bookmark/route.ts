import { NextResponse } from 'next/server';

import { deleteBookmark, getBookmarkDetail, postBookmarks, putBookmark } from '@/service/bookmark';

const GET = async (request: Request) => {
    const url = new URL(request.url);
    const bookmarkIdx = url.searchParams.get('bookmarkIdx');

    if (!bookmarkIdx) {
        return NextResponse.json({
            data: 'bookmarkIdx is required'
        });
    }

    const responseData = await getBookmarkDetail(Number(bookmarkIdx));

    return NextResponse.json({
        data: responseData.data
    });
};

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

const PUT = async (request: Request) => {
    const req = await request.json();
    const { url, name, bookmarkIdx } = req;

    const responseData = await putBookmark({ url, name, bookmarkIdx });

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

export { GET, POST, DELETE, PUT };
