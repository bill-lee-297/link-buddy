import React, {useState} from 'react';

type Props = {
    link: string;
    onClose: () => void;
};

export default function AddBookmarkForm({ onClose, link }: Props) {
    const [url, setUrl] = useState(link);
    const [name, setName] = useState("");
    const [folder, setFolder] = useState(0);
    const submit = () => {
        console.log(url, name, folder)
    }

    return (
        <section
            className="z-99 fixed left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-neutral-900/70"
            onClick={(e) => e.target === e.currentTarget && onClose()}
            role="none"
        >
            <div className="flex w-600 flex-col rounded-2xl bg-white p-4">
                <h1 className="text-xl">북마크 등록</h1>
                <div className="mt-6 flex flex-col gap-8">
                    <div className="flex flex-row items-center justify-start">
                        <div className="w-24">이름</div>
                        <input
                            type="text"
                            id="email"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            placeholder="여기에 이름을 입력해주세요."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-row items-center justify-start">
                        <div className="w-24">폴더 선택</div>
                        <select
                            id="countries"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                        >
                            <option selected>Default</option>
                        </select>
                    </div>
                    <div className="flex flex-row items-center justify-start">
                        <div className="w-24">URL</div>
                        <input
                            type="text"
                            id="email"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            placeholder="여기에 링크를 입력해주세요."
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="mt-4 flex flex-row items-center justify-end gap-4">
                    <button
                        type="button"
                        className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
                        onClick={() => onClose()}
                    >
                        취소
                    </button>
                    <button
                        type="button"
                        onClick={() => submit()}
                        className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                    >
                        등록
                    </button>
                </div>
            </div>
        </section>
    );
}
