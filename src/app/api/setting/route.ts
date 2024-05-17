import { NextResponse } from 'next/server';

import { getSetting, setSetting } from '@/service/setting';

const GET = async () => {
    try {
        const responseData = await getSetting();

        if (responseData.status === 'success') {
            return NextResponse.json({
                status: 200,
                data: responseData.data
            });
        }
        return NextResponse.json({
            status: 400,
            data: '오류가 발생하였습니다.'
        });
    } catch (e) {
        return NextResponse.json({
            status: 400,
            data: '오류가 발생하였습니다.'
        });
    }
};

const PUT = async (request: Request) => {
    const req = await request.json();
    const { newTab } = req;

    try {
        const responseData = await setSetting({ newTab });

        if (responseData.status === 200) {
            return NextResponse.json({
                status: 400,
                data: responseData.message
            });
        }
        return NextResponse.json({
            status: 400,
            data: '오류가 발생하였습니다.'
        });
    } catch (e) {
        return NextResponse.json({
            status: 400,
            data: '오류가 발생하였습니다.'
        });
    }
};

export { GET, PUT };
