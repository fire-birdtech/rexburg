module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended",
        "plugin:tailwindcss/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "tailwindcss"
    ],
    "rules": {
        "react/react-in-jsx-scope": "off",
        "multiline-ternary": "off",
        "tailwindcss/no-custom-classname": "off",
    },
    "settings": {
        "react": {
            "version": 'detect',
        },
    }
}
