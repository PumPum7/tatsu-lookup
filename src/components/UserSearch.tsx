import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";

const MINIMUM_ID = 1e13;

const UserSearch = (): JSX.Element => {
    const router = useRouter();
    const inputField = useRef();
    const [error, setError] = useState<{ status: boolean; message: string }>({
        status: false,
        message: "",
    });

    const handleClick = (e) => {
        e.preventDefault();
        if (inputField.current !== undefined) {
            // @ts-ignore
            const currentValue = inputField.current.value || 0;
            if (currentValue > MINIMUM_ID) {
                router.push(currentValue);
            } else {
                setError({
                    status: true,
                    message: "Please make sure that the ID is valid.",
                });
            }
        }
    };

    useEffect(() => {
        if (error.status) {
            setTimeout(() => {
                setError({ status: false, message: "" });
            }, 5000);
        }
    }, [error]);

    return (
        <div className="flex justify-center pt-6">
            <form>
                <label htmlFor="search" className="text-2xl text-white">
                    User ID:
                </label>
                <div>
                    <input
                        type="number"
                        placeholder="577840997078401035"
                        id="search"
                        className={`mr-2 rounded-md bg-tatsuGray text-white ${
                            error.status ? "border-tatsuError" : ""
                        }`}
                        ref={inputField}
                    />
                    <button
                        type="submit"
                        onClick={handleClick}
                        className="btn border-tatsuGreen bg-tatsuGreen bg-opacity-50"
                    >
                        search
                    </button>
                </div>
                {error.status ? (
                    <p className="text-tatsuError pt-2">{error.message}</p>
                ) : (
                    ""
                )}
            </form>
        </div>
    );
};

export default UserSearch;
