import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    {
        ignores: ["**/node_modules/*", "**/out/*", "**/.next/*"],
    },
    ...fixupConfigRules(
        compat.extends(
            "airbnb",
            "airbnb/hooks",
            "eslint:recommended",
            "plugin:react/recommended",
            "plugin:@typescript-eslint/recommended",
            "plugin:import/errors",
            "plugin:import/warnings",
            "plugin:import/typescript",
            "plugin:prettier/recommended",
            "plugin:@next/next/recommended"
        )
    ),
    {
        plugins: {
            "@typescript-eslint": fixupPluginRules(typescriptEslint),
            prettier: fixupPluginRules(prettier),
            "unused-imports": unusedImports,
        },

        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.jest,
                ...globals.node,
            },

            parser: tsParser,
        },

        settings: {
            react: {
                version: "detect",
            },

            "import/resolver": {
                typescript: {},
            },
        },

        rules: {
            "react/require-default-props": 0,
            "unused-imports/no-unused-imports": "error",
            "prettier/prettier": "error",
            "@typescript-eslint/explicit-module-boundary-types": 0,

            "react/jsx-filename-extension": [
                1,
                {
                    extensions: [".ts", ".tsx"],
                },
            ],

            "react/jsx-props-no-spreading": 0,
            "jsx-a11y/anchor-is-valid": 0,
            "react/react-in-jsx-scope": 0,
            "react/display-name": 0,
            "react/prop-types": 0,
            "@typescript-eslint/explicit-function-return-type": 0,
            "@typescript-eslint/explicit-member-accessibility": 0,
            "@typescript-eslint/indent": 0,
            "@typescript-eslint/member-delimiter-style": 0,
            "@typescript-eslint/no-explicit-any": 0,
            "@typescript-eslint/no-var-requires": 0,
            "@typescript-eslint/ban-ts-comment": "off",
            "no-use-before-define": 0,
            "@typescript-eslint/no-use-before-define": 0,

            "import/extensions": [
                "error",
                "never",
                {
                    svg: "always",
                },
            ],

            "react/no-unescaped-entities": 0,
            "jsx-a11y/label-has-associated-control": 0,
            "react/no-unused-prop-types": 0,

            "@typescript-eslint/no-unused-vars": [
                2,
                {
                    argsIgnorePattern: "^_",
                },
            ],

            "no-console": [
                2,
                {
                    allow: ["warn", "error"],
                },
            ],

            "@next/next/no-document-import-in-page": 0,

            "import/order": [
                "error",
                {
                    groups: ["builtin", "external", "internal"],

                    pathGroups: [
                        {
                            pattern: "react",
                            group: "external",
                            position: "before",
                        },
                    ],

                    pathGroupsExcludedImportTypes: ["react"],
                    "newlines-between": "always",

                    alphabetize: {
                        order: "asc",
                        caseInsensitive: true,
                    },
                },
            ],
        },
    },
];
