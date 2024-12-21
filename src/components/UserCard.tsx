"use client";

import Image from "next/image";
import { UserProfile } from "tatsu";

import GratipayIcon from "@components/icons/GratipayIcon";
import FavoriteIcon from "@components/icons/FavoriteIcon";
import UserStats from "@components/UserStats";
import { useFavorites } from "@hooks/useFavorites";

function UserCard({ userProfile }: { userProfile: UserProfile }) {
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();
    const subscriptionType = userProfile.subscription_type;
    let subscriptionColor = "text-tatsu-tier1";

    if (subscriptionType === 3) {
        subscriptionColor = "text-tatsu-tier3";
    } else if (subscriptionType === 2) {
        subscriptionColor = "text-tatsu-tier2";
    }

    const handleFavoriteClick = () => {
        if (isFavorite(userProfile.id)) {
            removeFavorite(userProfile.id);
        } else {
            addFavorite(userProfile.id);
        }
    };

    return (
        <div className="rounded-md bg-tatsuGray-dark p-4 md:w-3/4 w-11/12 mt-6 mx-auto grid grid-cols-3 gap-2 md:gap-4 justify-items-center text-white">
            <div className="relative">
                <Image
                    src={userProfile.avatar_url}
                    alt="profile picture"
                    width={100}
                    height={100}
                    className="rounded-full"
                />
                <button
                    onClick={handleFavoriteClick}
                    className="absolute -top-2 -right-2 p-1 rounded-full bg-tatsuGray-dark hover:bg-tatsuGray transition-colors"
                    aria-label={isFavorite(userProfile.id) ? "Remove from favorites" : "Add to favorites"}
                >
                    <FavoriteIcon
                        filled={isFavorite(userProfile.id)}
                        className="text-yellow-400 hover:scale-110 transition-transform"
                    />
                </button>
            </div>
            <div className="justify-self-start col-span-2">
                <p className="text-sm">{userProfile.title}</p>
                <p className="text-xl">{userProfile.username}</p>
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
            <UserStats
                userProfile={userProfile}
                subscriptionColor={subscriptionColor}
            />
        </div>
    );
}

export default UserCard;
