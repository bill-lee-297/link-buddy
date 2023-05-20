export default function Header() {
    return (
        <header className="flex h-20 w-full items-center justify-between bg-amber-100 px-10 py-6">
            <div className="flex items-center">
                <p className="font text-lg font-semibold">Link Buddy</p>
            </div>
            <div className="flex items-center">
                <nav className="">
                    <ul className="flex gap-4">
                        <li className="">
                            <p>profile</p>
                        </li>
                        <li>
                            <button>Sign In</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
