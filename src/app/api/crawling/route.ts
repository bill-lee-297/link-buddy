import { NextResponse } from 'next/server';

import crawling from '@/service/crawling';

const GET = async (request: Request) => {
    const url = new URL(request.url);
    const inputLink = url.searchParams.get('inputLink');

    if (!inputLink) {
        return NextResponse.json({
            data: 'inputLink is required'
        });
    }

    const crawlingData = await crawling(inputLink);

    const { title, faviconURL } = crawlingData;

    return NextResponse.json({
        data: {
            title,
            faviconURL
        }
    });
};

export { GET };
