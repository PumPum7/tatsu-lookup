"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const COOKIE_KEY = "favorites";

export function useFavorites() {
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        // Load favorites from cookies on mount
        const stored = Cookies.get(COOKIE_KEY);
        if (stored) {
            setFavorites(JSON.parse(stored));
        }
    }, []);

    const addFavorite = (userId: string) => {
        const newFavorites = [...favorites, userId];
        setFavorites(newFavorites);
        Cookies.set(COOKIE_KEY, JSON.stringify(newFavorites), { expires: 365 });
    };

    const removeFavorite = (userId: string) => {
        const newFavorites = favorites.filter((id) => id !== userId);
        setFavorites(newFavorites);
        Cookies.set(COOKIE_KEY, JSON.stringify(newFavorites), { expires: 365 });
    };

    const isFavorite = (userId: string) => favorites.includes(userId);

    return {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
    };
}
