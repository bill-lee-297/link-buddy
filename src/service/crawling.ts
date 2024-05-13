import axios from 'axios';
import * as cheerio from 'cheerio';

import { isValidUrl } from '@/lib/utils';

const crawling = async (inputLink: string) => {
    const responseData = await axios.get(inputLink);

    // console.log(responseData);

    const { protocol } = responseData.request;
    const hostURL = responseData.request.host || inputLink;
    const $ = cheerio.load(responseData.data);
    const title = $('head title').html();

    console.log(responseData.data);
    let favicon = $('link[rel="icon"]').attr('href');
    if (!favicon) {
        favicon = $('link[rel="shortcut icon"]').attr('href');
    }
    if (!favicon) {
        favicon = $('meta[itemprop="image"]').attr('content');
    }

    let faviconURL;

    if (!isValidUrl(String(favicon))) {
        if (favicon?.charAt(0) !== '/') {
            favicon = `/${favicon}`;
        }

        faviconURL = `${protocol}//${hostURL}${favicon}`;
    } else {
        faviconURL = String(favicon);
    }

    return {
        title,
        faviconURL
    };
};

export default crawling;
