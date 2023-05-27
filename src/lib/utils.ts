import axios from 'axios';

export function getApi(url: string, requestData?: object) {
    return axios({
        method: 'get',
        url: process.env.NEXT_PUBLIC_BASE_URL + url,
        params: requestData
    })
        .then((response) => response)
        .then((data) => data.data.data.rows);
}

export function postApi(url: string, requestData?: object) {
    return axios({
        method: 'get',
        url,
        data: requestData
    });
}
