import Head from "next/head";
import Image from "next/image";
import { UserProfile } from "tatsu";

import CoinsIcon from "@components/icons/CoinsIcon";
import GratipayIcon from "@components/icons/GratipayIcon";
import StarIcon from "@components/icons/StarIcon";

const UserCard = ({
    userProfile,
}: {
    userProfile: UserProfile;
}): JSX.Element => {
    const subscriptionType = userProfile.subscription_type;
    let subscriptionColor = "text-tatsu-tier1";

    if (subscriptionType === 3) {
        subscriptionColor = "text-tatsu-tier3";
    } else if (subscriptionType === 2) {
        subscriptionColor = "text-tatsu-tier2";
    }

    return (
        <div className="rounded-md bg-tatsuGray-dark p-4 w-3/4 mt-6 mx-auto grid grid-cols-3 gap-4 justify-items-center text-white">
            <Image
                src={userProfile.avatar_url}
                alt="profile picture"
                placeholder="blur"
                width={120}
                height={120}
                className="rounded-full"
            />
            <div className="justify-self-start col-span-2">
                <p className="text-sm">{userProfile.title}</p>
                <p className="text-xl">
                    {userProfile.username}#{userProfile.discriminator}
                </p>
                <p className="text-tatsuGray-light">{userProfile.id}</p>
                {userProfile.subscription_type > 0 ? (
                    <p className="text-tatsu-supporter flex font-semibold">
                        <GratipayIcon className="pr-2 w-6 h-6" /> Supporter
                        {"+".repeat(userProfile.subscription_type - 1)}
                    </p>
                ) : (
                    <p>Not a supporter</p>
                )}
            </div>
            <div className="justify-self-start col-span-2">
                <p className="text-lg">Wallet:</p>
                <p className="text-tatsuGray-light">
                    ¥ {userProfile.credits} credits
                </p>
            </div>
            <div className="place-self-end">
                <p className="text-tatsu-tokens flex">
                    <CoinsIcon className="pr-2 w-6 h-6" />
                    {userProfile.tokens} tokens
                </p>
            </div>
            <div className="justify-self-start col-span-2">
                <p className="text-lg">Profile:</p>
                <p className="text-tatsu-exp">
                    EXP {userProfile.xp}{" "}
                    <span className="text-tatsu-level">
                        (lvl {userProfile.level})
                    </span>
                </p>
            </div>
            <div className="place-self-end">
                <p className="text-tatsu-rep flex">
                    <StarIcon />
                    {userProfile.reputation} rep
                </p>
            </div>
            <div className="justify-self-start col-span-3">
                <p className="text-lg">Subscription:</p>
                {userProfile.subscription_type > 0 ? (
                    <p>
                        <span className={subscriptionColor}>
                            Tier {userProfile.subscription_type}
                        </span>
                        , ends{" "}
                        {new Date(
                            userProfile.subscription_renewal
                        ).toDateString()}
                    </p>
                ) : (
                    <p>Not a supporter currently</p>
                )}
            </div>
        </div>
    );
};

export default UserCard;

// TODO: use more components here
// TODO: supporter text
// https://cdn.discordapp.com/attachments/376036722297012224/897863521205907527/unknown.png
