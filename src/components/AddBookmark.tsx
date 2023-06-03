export default function AddBookmark() {
    return (
        <div className="w-200 my-4 flex justify-center gap-4 border-b p-6">
            <input
                type="text"
                className="w-4/5 rounded-lg border-2 border-gray-200 px-2 py-4 pl-4 sm:w-4/5 md:w-3/5 lg:w-2/5"
                placeholder="여기에 링크를 입력해주세요."
            />
        </div>
    );
}
