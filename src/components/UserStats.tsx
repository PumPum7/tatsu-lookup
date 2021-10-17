import { UserProfile } from "tatsu";

import CoinsIcon from "@components/icons/CoinsIcon";
import StarIcon from "@components/icons/StarIcon";

const UserStats = ({
    userProfile,
    subscriptionColor,
}: {
    userProfile: UserProfile;
    subscriptionColor: string;
}): JSX.Element => {
    const {
        credits,
        // eslint-disable-next-line camelcase
        subscription_type,
        // eslint-disable-next-line camelcase
        subscription_renewal,
        xp,
        reputation,
        level,
        tokens,
    } = userProfile;
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
                <p className="text-tatsu-exp">
                    EXP {xp}{" "}
                    <span className="text-tatsu-level">(lvl {level})</span>
                </p>
            </div>
            <div className="place-self-end">
                <p className="text-tatsu-rep flex">
                    <StarIcon />
                    {reputation} rep
                </p>
            </div>
            <div className="justify-self-start col-span-3">
                <p className="text-lg">Subscription:</p>
                {/* eslint-disable-next-line camelcase */}
                {subscription_type > 0 ? (
                    <p>
                        <span className={subscriptionColor}>
                            {/* eslint-disable-next-line camelcase */}
                            Tier {subscription_type}
                        </span>
                        , ends {new Date(subscription_renewal).toDateString()}
                    </p>
                ) : (
                    <p>Not a supporter currently</p>
                )}
            </div>
        </>
    );
};

export default UserStats;
