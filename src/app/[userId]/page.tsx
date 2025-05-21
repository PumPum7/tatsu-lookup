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

        const title = `${userData.username}'s Tatsu Profile`;
        const description = `Level ${Math.floor(Math.sqrt((userData.xp * 9) / 625))} • ${userData.reputation} Rep • ${userData.credits} Credits`;

        let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        if (!baseUrl) {
            console.warn("NEXT_PUBLIC_BASE_URL is not set. OpenGraph and Twitter images might not work correctly.");
            baseUrl = ''; // Fallback to relative path if not set, though not ideal for external services
        }

        const imageUrl = `${baseUrl}/api/user/${params.userId}/image`;
        const imageAlt = `Profile card for ${userData.username}`;

        return {
            title,
            description,
            openGraph: {
                title,
                description,
                images: [
                    {
                        url: imageUrl,
                        width: 400,
                        height: 200, // Adjusted height for a 2:1 aspect ratio
                        alt: imageAlt,
                    },
                ],
                type: "profile",
                username: userData.username, // Changed from firstName to username for clarity
            },
            twitter: {
                card: "summary_large_image",
                title,
                description,
                images: [
                    {
                        url: imageUrl,
                        alt: imageAlt,
                        // Twitter doesn't explicitly use width/height in the same way for summary_large_image in Metadata object
                        // but it's good practice to provide it if the type definition supports it.
                        // For now, we'll stick to URL and Alt as primary.
                    }
                ],
                creator: "@Pum",
            },
        };
    } catch (error) {
        console.error("Error generating metadata:", error);
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
        const calculatedLevel = Math.floor(
            Math.sqrt(((userData.xp as number) * 9) / 625)
        );
        userDataCopy.level = calculatedLevel;

        // handles default user avatars
        if (userData.avatar_url.includes("embed")) {
            userDataCopy.avatar_url = `${userData.avatar_url}.png`;
        }

        if (userDataCopy.subscription_renewal) {
            userDataCopy.subscription_renewal =
                userDataCopy.subscription_renewal.toString();
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
