// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    extends: [
        "eslint:recommended",
    ],
    "globals": {
        'require': true,
        'fetch': true,
        'window': true,
        'FastClick': true,
        'process': true,
        'console': true,
        'Promise': true,
        'document': true
    },
    // add your custom rules here
    'rules': {
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        "no-console": 0,
        "no-unused-vars": 0
    }
}
