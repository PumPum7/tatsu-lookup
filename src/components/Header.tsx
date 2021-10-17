import React from "react";

import GithubIcon from "@components/icons/GithubIcon";
import SearchIcon from "@components/icons/SearchIcon";

const GITHUB_URL = "https://github.com/PumPum7/tatsu-lookup";

const Header = (): JSX.Element => {
    return (
        <header className="flex justify-center items-center bg-tatsuGreen text-white relative">
            <SearchIcon className="sm:w-14 sm:h-14 w-8 h-8" />
            <h1 className="px-3 text-4xl font-bold leading-tight tracking-tight text-center sm:mt-4 sm:text-6xl sm:pb-4 pb-2">
                Tatsu Lookup
            </h1>
            <a
                href={GITHUB_URL}
                rel="noopener noreferrer"
                target="_blank"
                className="sm:absolute sm:right-4"
                title="Github"
            >
                <GithubIcon className="w-8 h-8 sm:w-12 sm:h-12" />
            </a>
        </header>
    );
};

export default Header;
