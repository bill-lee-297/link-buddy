import axios from 'axios';
import * as cheerio from 'cheerio';

import { isValidUrl } from '@/lib/utils';

const crawling = async (inputLink: string) => {
    const responseData = await axios.get(inputLink);

    const hostURL = responseData.config.url || inputLink;
    const $ = cheerio.load(responseData.data);
    const title = $('head title').html();
    let favicon = $('link[rel="icon"]').attr('href');
    if (!favicon) {
        favicon = $('link[rel="shortcut icon"]').attr('href');
    }

    console.log('favicon :: ', favicon);

    let faviconURL;

    if (!isValidUrl(String(favicon))) {
        if (favicon?.charAt(0) !== '/') {
            favicon = `/${favicon}`;
        }

        faviconURL = hostURL + favicon;
    } else {
        faviconURL = String(favicon);
    }

    console.log(faviconURL);

    return {
        title,
        faviconURL
    };
};

export default crawling;
