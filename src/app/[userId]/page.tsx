import { Metadata } from "next";
import { Tatsu, UserProfile } from "tatsu";
import UserCard from "@components/UserCard";
import UserSearch from "@components/UserSearch";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ userId: string }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    try {
        if (!process.env.TATSU_KEY) {
            console.error("TATSU_KEY is not defined");
            notFound();
        }

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
                card: "summary_large_image",
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
    if (!process.env.TATSU_KEY) {
        console.error("TATSU_KEY is not defined");
        notFound();
    }

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

export default async function UserLookupPage(props: Props) {
    const params = await props.params;
    const userProfile = await getUserProfile(params.userId);

    return (
        <div>
            <UserSearch />
            <UserCard userProfile={userProfile} />
        </div>
    );
}
