import React, { useEffect } from "react";

import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Tatsu, { UserProfile } from "tatsu";

import Header from "@components/Header";
import UserCard from "@components/UserCard";
import UserSearch from "@components/UserSearch";

export default function UserLookupPage({
    userProfile,
}: {
    userProfile: UserProfile;
}) {
    return (
        <div>
            <Head>
                <title>Tatsu Lookup</title>

                <meta
                    name="description"
                    content="Lookup tatsu information about a user using their ID"
                />

                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className="mx-auto max-w-sm md:max-w-2xl lg:max-w-screen-md">
                <UserSearch />
                <UserCard userProfile={userProfile} />
            </main>
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [{ params: { userId: "577840997078401035" } }],
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps = async (context: any) => {
    const { userId } = context.params;

    // @ts-ignore
    const client = new Tatsu(process.env.TATSU_KEY);
    const { _data: userData } = await client
        .getProfile(userId)
        .then((result) => result);

    // calculate the level
    userData.level = Math.floor(Math.sqrt(((userData.xp as number) * 9) / 625));

    return { props: { userProfile: userData }, revalidate: 10 };
};

// TODO: handle errors
