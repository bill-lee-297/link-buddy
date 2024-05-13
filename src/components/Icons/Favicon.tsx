import { SyntheticEvent, useEffect, useState } from 'react';

import Image from 'next/image';

type Props = {
    bookmarkImage: string;
    bookmarkName: string;
};

const Favicon = ({ bookmarkImage, bookmarkName }: Props) => {
    const [imgSrc, setImgSrc] = useState(bookmarkImage);
    const [currentUrl, setCurrentUrl] = useState('');

    useEffect(() => {
        setCurrentUrl(window.location.href);
    }, []);

    return (
        // <img src={imgSrc} alt={`${bookmarkName}의 favicon`} onError={() => setImgSrc(`${currentUrl}bookmark_ic.png`)} />
        <Image
            width="20"
            height="20"
            src={imgSrc}
            alt={`${bookmarkName}의 favicon`}
            onError={() => setImgSrc(`${currentUrl}bookmark_ic.png`)}
            unoptimized
        />
    );
};

export default Favicon;
