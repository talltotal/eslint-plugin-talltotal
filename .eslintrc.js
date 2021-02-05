module.exports = {
    root: true,
    env: {
        node: true,
        es6: true,
    },
    extends: 'eslint:recommended',
    rules: {
        'indent': ['error', 4],
        'semi': ['error', 'never'],
        'quotes': ['error', 'single'],
        'comma-dangle': ['error', {
            arrays: 'always-multiline',
            objects: 'always-multiline',
            imports: 'always-multiline',
            exports: 'always-multiline',
            functions: 'always-multiline',
        }],
    },
    parserOptions: {
        ecmaVersion: 2018,
        parser: 'babel-eslint',
    },
}
