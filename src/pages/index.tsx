import React from "react";

import Head from "next/head";

import Header from "@components/Header";
import UserSearch from "@components/UserSearch";

export default function Home() {
    return (
        <div>
            <Head>
                <title>Tatsu Lookup</title>

                <meta
                    name="description"
                    content="Lookup tatsu information about a user using their ID"
                />
            </Head>
            <Header />
            <main className="mx-auto max-w-sm md:max-w-2xl lg:max-w-screen-md">
                <UserSearch />
            </main>
        </div>
    );
}
