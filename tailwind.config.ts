import defaultTheme from "tailwindcss/defaultTheme";
import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
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
                tokens: "rgb(227,191,34)",
                exp: "rgb(23,161,103)",
                level: "rgb(52,211,153)",
                rep: "rgb(167,139,250)",
                tier3: "rgb(255,242,156)",
                tier2: "rgb(250,183,255)",
                tier1: "rgb(171,188,245)",
                supporter: "rgb(246,104,84)",
            },
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
} satisfies Config;
