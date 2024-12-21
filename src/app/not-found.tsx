import Link from "next/link";

export default function NotFound() {
    return (
        <div className="text-white flex items-center flex-col h-screen justify-center">
            <h1 className="text-8xl text-bold pb-8">404</h1>
            <h3 className="text-2xl text-bold pb-4">
                Sorry, this user was not found!
            </h3>
            <Link href="/" className="text-xl underline">
                Go back!
            </Link>
        </div>
    );
}
