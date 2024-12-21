import { Tatsu, UserProfile } from "tatsu";
import UserCard from "@components/UserCard";
import Link from "next/link";
import { cookies } from "next/headers";

async function getFavoriteUsers() {
    if (!process.env.TATSU_KEY) {
        throw new Error("TATSU_KEY is not defined");
    }

    // Get favorites from cookie
    const cookieStore = await cookies();
    const favoritesStr = cookieStore.get("favorites")?.value;
    const favorites = favoritesStr ? JSON.parse(favoritesStr) : [];

    if (favorites.length === 0) {
        return [];
    }

    const client = new Tatsu(process.env.TATSU_KEY);
    const fetchedUsers = await Promise.all(
        favorites.map(async (userId: string) => {
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
            } catch (error) {
                console.error(`Failed to fetch user ${userId}:`, error);
                return null;
            }
        })
    );

    return fetchedUsers.filter((user): user is UserProfile => user !== null);
}

export default async function FavoritesPage() {
    const users = await getFavoriteUsers();

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl text-white">Favorite Users</h1>
                <Link
                    href="/"
                    className="text-tatsuGreen hover:text-opacity-80"
                >
                    Back to Search
                </Link>
            </div>
            <div className="flex flex-col gap-4">
                {users.length === 0 ? (
                    <p className="text-white text-center">
                        No favorite users yet.
                    </p>
                ) : (
                    users.map((user) => (
                        <UserCard key={user.id} userProfile={user} />
                    ))
                )}
            </div>
        </div>
    );
}
