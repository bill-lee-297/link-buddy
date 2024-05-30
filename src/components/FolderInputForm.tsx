import React, { useState } from 'react';

import { signOut } from 'next-auth/react';

import ModalSpinner from '@/components/modal/ModalSpinner';

type Props = {
    onClose: () => void;
};

const FolderInputForm = ({ onClose }: Props) => {
    const [submitLoading, setSubmitLoading] = useState(false);

    const handleNewFolder = async () => {
        setSubmitLoading(true);

        setSubmitLoading(false);
    };

    return (
        <div>
            <section
                className="z-99 fixed left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-neutral-900/70"
                onClick={(e) => e.target === e.currentTarget && onClose()}
                role="none"
            >
                <div className="display relative flex w-400 flex-col rounded-2xl bg-white">
                    <div className="p-4">
                        <h1 className="text-xl">폴더생성</h1>
                    </div>
                    <div className="border-b-2 border-b-gray-200 " />
                    <div className="flex flex-col gap-8 px-4 py-6">
                        <div className="flex flex-row items-center justify-between">
                            <div className="w-100">폴더이름</div>
                            <input type="text" />
                        </div>
                    </div>

                    {submitLoading && <ModalSpinner />}
                </div>
            </section>
        </div>
    );
};

export default FolderInputForm;
