"use client";

import Image from "next/image";
import { UserProfile } from "tatsu";

import GratipayIcon from "@components/icons/GratipayIcon";
import FavoriteIcon from "@components/icons/FavoriteIcon";
import ShareIcon from "@components/icons/ShareIcon";
import UserStats from "@components/UserStats";
import { useFavorites } from "@hooks/useFavorites";
import { useState } from "react";

function UserCard({ userProfile }: { userProfile: UserProfile }) {
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();
    const [showShareTooltip, setShowShareTooltip] = useState(false);
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

    const handleShare = async () => {
        const url = `${window.location.origin}/${userProfile.id}`;
        
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${userProfile.username}'s Tatsu Profile`,
                    text: `Check out ${userProfile.username}'s Tatsu profile!`,
                    url: url,
                });
            } catch (err) {
                await copyToClipboard(url);
            }
        } else {
            await copyToClipboard(url);
        }
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setShowShareTooltip(true);
            setTimeout(() => setShowShareTooltip(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
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
                <div className="absolute -top-2 -right-2 flex flex-row gap-2">
                    <button
                        onClick={handleFavoriteClick}
                        className="p-1 rounded-full bg-tatsuGray-dark hover:bg-tatsuGray transition-colors"
                        aria-label={isFavorite(userProfile.id) ? "Remove from favorites" : "Add to favorites"}
                    >
                        <FavoriteIcon
                            filled={isFavorite(userProfile.id)}
                            className="text-yellow-400 hover:scale-110 transition-transform"
                        />
                    </button>
                    <div className="relative">
                        <button
                            onClick={handleShare}
                            className="p-1 rounded-full bg-tatsuGray-dark hover:bg-tatsuGray transition-colors"
                            aria-label="Share profile"
                        >
                            <ShareIcon className="text-tatsuGreen hover:scale-110 transition-transform" />
                        </button>
                        {showShareTooltip && (
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-tatsuGray-dark px-2 py-1 rounded text-sm">
                                Copied to clipboard!
                            </div>
                        )}
                    </div>
                </div>
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
