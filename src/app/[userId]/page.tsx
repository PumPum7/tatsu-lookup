import { Metadata } from "next";
import { Tatsu, UserProfile } from "tatsu";
import UserCard from "@components/UserCard";
import UserSearch from "@components/UserSearch";
import { notFound } from "next/navigation";

interface Props {
    params: { userId: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const client = new Tatsu(process.env.TATSU_KEY);
        const userData = await client.getProfile(params.userId);
        
        return {
            title: `Tatsu user ${userData.username}'s lookup`,
            description: `Check out ${userData.username}'s tatsu stats!`,
            openGraph: {
                title: `Tatsu user ${userData.username}'s lookup`,
                description: `Check out ${userData.username}'s tatsu stats!`,
                images: [userData.avatar_url],
            },
            twitter: {
                card: "summary_small_image",
            },
        };
    } catch {
        return {
            title: "User not found",
            description: "This user could not be found",
        };
    }
}

async function getUserProfile(userId: string): Promise<UserProfile> {
    const client = new Tatsu(process.env.TATSU_KEY);
    try {
        const userData = await client.getProfile(userId);
        const userDataCopy = userData.toJSON();

        // calculate the level
        const calculatedLevel = Math.floor(Math.sqrt(((userData.xp as number) * 9) / 625));
        userDataCopy.level = calculatedLevel;

        // handles default user avatars
        if (userData.avatar_url.includes("embed")) {
            userDataCopy.avatar_url = `${userData.avatar_url}.png`;
        }

        if (userDataCopy.subscription_renewal) {
            userDataCopy.subscription_renewal = userDataCopy.subscription_renewal.toString();
        }

        return userDataCopy as UserProfile;
    } catch {
        notFound();
    }
}

export default async function UserLookupPage({ params }: Props) {
    const userProfile = await getUserProfile(params.userId);

    return (
        <div>
            <UserSearch />
            <UserCard userProfile={userProfile} />
        </div>
    );
}
