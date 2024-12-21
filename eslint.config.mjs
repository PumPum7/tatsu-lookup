import js from "@eslint/js";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import nextPlugin from "@next/eslint-plugin-next";

export default [
    {
        ignores: ["**/node_modules/*", "**/out/*", "**/.next/*"],
    },
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        plugins: {
            "@typescript-eslint": typescriptEslint,
            prettier: prettier,
            react: reactPlugin,
            "react-hooks": reactHooks,
            "@next/next": nextPlugin,
        },
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
                ...globals.jest,
                ...globals.node,
            },
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        rules: {
            // TypeScript specific rules
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
            "@typescript-eslint/no-use-before-define": "off",
            "@typescript-eslint/ban-ts-comment": "off",

            // React specific rules
            "react/jsx-filename-extension": ["error", { extensions: [".ts", ".tsx"] }],
            "react/jsx-props-no-spreading": "off",
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
            "react/display-name": "off",
            "react/require-default-props": "off",
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",

            // Next.js specific rules
            "@next/next/no-document-import-in-page": "off",

            // General rules
            "prettier/prettier": "error",
            "no-console": ["error", { allow: ["warn", "error"] }],
        },
    },
    js.configs.recommended,
];
