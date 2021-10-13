import React from "react";

import SearchIcon from "@components/icons/SearchIcon";

const Header = (): JSX.Element => {
    return (
        <header className="flex justify-center items-center bg-tatsuGreen text-white">
            <SearchIcon className="sm:w-14 sm:h-14 w-8 h-8" />
            <h1 className="px-5 text-4xl font-bold leading-tight tracking-tight text-center sm:mt-4 sm:text-6xl md:pb-4">
                Tatsu Lookup
            </h1>
        </header>
    );
};

export default Header;
