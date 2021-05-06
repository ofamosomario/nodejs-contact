module.exports = {
    env: {
        es6: false,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'prettier'
    ],
    plugins: ['prettier'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        "prettier/prettier": "error",
        "class-methods-use-this": "off",
        "no-param-reassign": "off",
        "camelcase": "off",
        "no-underscore-dangle": "off",
        "no-unused-vars": ["error", { "argsIgnorePattern": "next" }]
    },
};
