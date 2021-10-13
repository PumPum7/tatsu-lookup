const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    mode: "jit",
    purge: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", ...defaultTheme.fontFamily.sans],
            },
        },
        colors: {
            tatsuGreen: {
                DEFAULT: "#2CA169",
            },
            tatsuBlack: {
                DEFAULT: "#282A2E",
            },
            tatsuGray: {
                light: "#9CA3AF",
                DEFAULT: "#434A59",
                dark: "#23272A",
            },
            tatsuError: {
                DEFAULT: "#DC4E4EFF",
            },
            tatsu: {
                tokens: "#E3BF22FF",
                exp: "#17A167FF",
                level: "#34D399",
                rep: "#A78BFA",
                tier3: "#FFF29CFF",
                tier2: "#FAB7FFFF",
                tier1: "#ABBCF5FF",
            },
            white: defaultTheme.colors.white,
            black: defaultTheme.colors.black,
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        // eslint-disable-next-line global-require
        require("@tailwindcss/typography"),
        // eslint-disable-next-line global-require
        require("@tailwindcss/forms"),
    ],
};
