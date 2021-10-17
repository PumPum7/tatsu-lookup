import React from "react";

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

                <title>Tatsu user {userProfile.username}`s lookup</title>

                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Tatsu Lookup" />
                <meta
                    property="og:title"
                    content={`Tatsu user ${userProfile.username}'s lookup`}
                />
                <meta
                    property="og:description"
                    content={`Check out ${userProfile.username}'s tatsu stats!`}
                />
                <meta property="og:image" content={userProfile.avatar_url} />
                <meta name="twitter:card" content="summary_small_image" />
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

    let errorHappened: boolean;

    let userData: UserProfile;

    // @ts-ignore
    const client = new Tatsu(process.env.TATSU_KEY);
    try {
        ({ _data: userData } = await client
            .getProfile(userId)
            .then((result) => result));
    } catch {
        errorHappened = true;
    }

    if (errorHappened) {
        return { notFound: true };
    }

    // calculate the level
    userData.level = Math.floor(Math.sqrt(((userData.xp as number) * 9) / 625));

    // handles default user avatars
    if (userData.avatar_url.includes("embed")) {
        userData.avatar_url += ".png";
    }

    return {
        props: { userProfile: userData },
        revalidate: 60,
    };
};
