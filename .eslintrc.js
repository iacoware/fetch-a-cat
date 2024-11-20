module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
    ],
    plugins: ["react", "prettier", "@typescript-eslint"],
    globals: {},
    settings: {
        react: {
            pragma: "React",
            version: "detect",
        },
    },
    rules: {
        "prettier/prettier": ["error"],
        "react/prop-types": ["off"], // Disabled cause it's a playground. Enable it in prod
        "no-unused-vars": ["warn"], // Disabled cause it's a playground. Enable it in prod
    },
}
