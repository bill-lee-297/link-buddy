import { NextResponse } from 'next/server';

import { postBookmarks } from '@/service/bookmark';

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

export { POST };
