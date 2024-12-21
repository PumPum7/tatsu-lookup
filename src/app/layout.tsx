import type { Metadata } from "next";
import Header from "@components/Header";
import "../styles/global.css";

export const metadata: Metadata = {
    title: "Tatsu Lookup",
    description: "Check out other users tatsu profile without using any commands!",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Header />
                <main className="mx-auto max-w-sm md:max-w-2xl lg:max-w-screen-md">
                    {children}
                </main>
            </body>
        </html>
    );
}
