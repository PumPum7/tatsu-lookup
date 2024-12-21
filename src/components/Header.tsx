import React from "react";
import Link from "next/link";

import GithubIcon from "@components/icons/GithubIcon";
import SearchIcon from "@components/icons/SearchIcon";
import FavoriteIcon from "@components/icons/FavoriteIcon";

const GITHUB_URL = "https://github.com/PumPum7/tatsu-lookup";

function Header() {
    return (
        <header className="flex justify-between items-center bg-tatsuGreen text-white px-4">
            <div className="flex items-center">
                <SearchIcon className="md:w-14 md:h-14 w-8 h-8" />
                <h1 className="px-3 text-4xl font-bold leading-tight tracking-tight text-center md:mt-4 md:text-6xl md:pb-4 pb-2">
                    Tatsu Lookup
                </h1>
            </div>
            <div className="flex items-center gap-4">
                <Link href="/favorites" className="hover:text-opacity-80" title="Favorites">
                    <FavoriteIcon filled className="w-8 h-8 md:w-10 md:h-10" />
                </Link>
                <a
                    href={GITHUB_URL}
                    rel="noopener noreferrer"
                    target="_blank"
                    title="Github"
                >
                    <GithubIcon className="w-8 h-8 md:w-10 md:h-10" />
                </a>
            </div>
        </header>
    );
}

export default Header;
