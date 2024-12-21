import { UserProfile } from "tatsu";

import CoinsIcon from "@components/icons/CoinsIcon";
import StarIcon from "@components/icons/StarIcon";

function calculateXPForLevel(level: number): number {
    return Math.floor((level * level * 625) / 9);
}

function UserStats({
    userProfile,
    subscriptionColor,
}: {
    userProfile: UserProfile;
    subscriptionColor: string;
}) {
    const {
        credits,
        subscription_type,
        subscription_renewal,
        experience,
        reputation,
        level,
        tokens,
    } = userProfile;

    // Calculate XP progress
    const currentLevelXP = calculateXPForLevel(level);
    const nextLevelXP = calculateXPForLevel(level + 1);
    const xpProgress =
        ((experience - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
    const xpToNext = nextLevelXP - experience;

    return (
        <>
            <div className="justify-self-start col-span-2">
                <p className="text-lg">Wallet:</p>
                <p className="text-tatsuGray-light">¥ {credits} credits</p>
            </div>
            <div className="place-self-end">
                <p className="text-tatsu-tokens flex">
                    <CoinsIcon className="pr-2 w-6 h-6" />
                    {tokens} tokens
                </p>
            </div>
            <div className="justify-self-start col-span-2">
                <p className="text-lg">Profile:</p>
                <div className="relative pt-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-tatsu-exp">Level {level}</span>
                        </div>
                    </div>
                    <div className="group relative">
                        <div className="overflow-hidden h-2 mt-1 text-xs flex rounded bg-tatsuGray">
                            <div
                                style={{ width: `${xpProgress}%` }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-tatsu-exp transition-all duration-500"
                            />
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -top-7 left-1/2 -translate-x-1/2 bg-tatsuGray-dark px-2 py-1 rounded text-sm whitespace-nowrap">
                            {xpToNext.toLocaleString("en-US")} XP to next level
                        </div>
                    </div>
                    <div className="text-sm text-tatsuGray-light mt-1">
                        {experience.toLocaleString("en-US")} / {nextLevelXP.toLocaleString("en-US")} XP
                    </div>
                </div>
            </div>
            <div className="place-self-end">
                <p className="text-tatsu-rep flex">
                    <StarIcon />
                    {reputation} rep
                </p>
            </div>
            <div className="justify-self-start col-span-3">
                <p className="text-lg">Subscription:</p>
                {subscription_type > 0 ? (
                    <p>
                        <span className={subscriptionColor}>
                            Tier {subscription_type}
                        </span>
                        , ends {subscription_renewal ? new Date(subscription_renewal).toDateString() : "unknown"}
                    </p>
                ) : (
                    <p>Not a supporter currently</p>
                )}
            </div>
        </>
    );
}

export default UserStats;
