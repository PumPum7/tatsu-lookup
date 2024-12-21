import React from "react";

import GithubIcon from "@components/icons/GithubIcon";
import SearchIcon from "@components/icons/SearchIcon";

const GITHUB_URL = "https://github.com/PumPum7/tatsu-lookup";

function Header() {
    return (
        <header className="flex justify-center items-center bg-tatsuGreen text-white relative">
            <SearchIcon className="md:w-14 md:h-14 w-8 h-8" />
            <h1 className="px-3 text-4xl font-bold leading-tight tracking-tight text-center md:mt-4 md:text-6xl md:pb-4 pb-2">
                Tatsu Lookup
            </h1>
            <a
                href={GITHUB_URL}
                rel="noopener noreferrer"
                target="_blank"
                className="md:absolute md:right-4"
                title="Github"
            >
                <GithubIcon className="w-8 h-8 md:w-12 md:h-12" />
            </a>
        </header>
    );
}

export default Header;
