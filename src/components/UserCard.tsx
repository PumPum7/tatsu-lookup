import Image from "next/image";
import { UserProfile } from "tatsu";

import GratipayIcon from "@components/icons/GratipayIcon";
import UserStats from "@components/UserStats";

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
        <div className="rounded-md bg-tatsuGray-dark p-4 sm:w-3/4 w-11/12 mt-6 mx-auto grid grid-cols-3 gap-4 justify-items-center text-white ">
            <Image
                src={userProfile.avatar_url}
                alt="profile picture"
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
            <UserStats
                userProfile={userProfile}
                subscriptionColor={subscriptionColor}
            />
        </div>
    );
};

export default UserCard;
