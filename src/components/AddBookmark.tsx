'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import AddBookmarkForm from '@/components/AddBookmarkForm';
import ModalPortal from '@/components/modal/ModalPortal';

export default function AddBookmark() {
    const [openModal, setOpenModal] = useState(false);
    const [inputLink, setInputLink] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (!openModal) {
            setInputLink('');
            router.refresh();
        }
    }, [openModal]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 0) {
            setInputLink(e.target.value);
            setOpenModal(true);
        }
    };

    return (
        <div className="w-200 my-4 flex justify-center gap-4 border-b p-6">
            <input
                type="text"
                className="w-4/5 rounded-lg border-2 border-gray-200 px-2 py-4 pl-4 sm:w-4/5 md:w-3/5 lg:w-2/5"
                placeholder="여기에 등록할 URL을 붙여넣기 해주세요."
                value={inputLink}
                onChange={handleInputChange}
            />

            {openModal && (
                <ModalPortal>
                    <AddBookmarkForm onClose={() => setOpenModal(false)} link={inputLink} />
                </ModalPortal>
            )}
        </div>
    );
}
