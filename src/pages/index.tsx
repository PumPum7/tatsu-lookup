import React from "react";

import Head from "next/head";

import Header from "@components/Header";
import UserSearch from "@components/UserSearch";

export default function Home() {
    return (
        <div>
            <Head>
                <title>Tatsu Lookup</title>

                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Tatsu Lookup" />
                <meta property="og:title" content="Tatsu Lookup" />
                <meta
                    property="og:description"
                    content="Check out other users tatsu profile without using any commands!"
                />
            </Head>
            <Header />
            <main className="mx-auto max-w-sm md:max-w-2xl lg:max-w-screen-md">
                <UserSearch />
            </main>
        </div>
    );
}
