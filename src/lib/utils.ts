import axios from 'axios';

type GetProps = {
    endpoint: string;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    body?: object;
    params?: object;
};

const API = async ({ endpoint, method, body, params }: GetProps) => {
    const {
        data: responseData,
        status,
        headers
    } = await axios({
        url: endpoint,
        method,
        data: body,
        params
    });

    return {
        data: responseData.data,
        status,
        headers: { ...responseData.headers }
    };
};

const isValidUrl = (url: string) => {
    const urlRegex = /^(http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
};

export { API, isValidUrl };
