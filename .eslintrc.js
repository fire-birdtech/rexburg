module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:vue/vue3-essential',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'tailwindcss',
    'vue',
  ],
  root: true,
  rules: {
    '@typescript-eslint/no-unused-vars': 1,
    'import/no-unresolved': 1,
    'max-len': 0,
    'no-undef': 1,
    'react/react-in-jsx-scope': 0,
    'import/extensions': 0,
    'vue/multi-word-component-names': 0,
    'vue/no-reserved-component-names': 1,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './resources/js'],
        ],
        extensions: ['.js', '.ts', '.tsx', '.vue'],
      },
      node: {
        extensions: ['.ts', '.tsx'],
        moduleDirectory: ['resources/js'],
      },
    },
    react: {
      version: 'detect',
    },
  },
};
