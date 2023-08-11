module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'plugin:vue/vue3-essential',
    'plugin:tailwindcss/recommended',
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
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'vue',
    'tailwindcss',
  ],
  rules: {
    'max-len': 0,
    'no-undef': 1,
    'vue/multi-word-component-names': 0,
    'vue/no-reserved-component-names': 1,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './resources/js'],
        ],
        extensions: ['.js', '.vue'],
      },
    },
  },
};
