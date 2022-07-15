module.exports = {
    defaultNamespace: 'common',
    useKeysAsDefaultValue: true,
    locales: ['en', 'vi'],
    output: '../src/languages/locales/$LOCALE.json',
    input: '**/*.{js,ts,tsx}',
    sort: true,
    lexers: {
        js: ['JsxLexer'],
        ts: ['JavascriptLexer'],
        jsx: ['JsxLexer'],
        tsx: ['JsxLexer'],
    },
};
