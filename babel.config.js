module.exports = (api) => {
    const env = api.cache(() => process.env.NODE_ENV);

    return {
        plugins: [
            [
                require.resolve('babel-plugin-react-intl'),
                {
                    ast: true,
                    extractFromFormatMessageCall: true,
                    idInterpolationPattern: '[sha512:contenthash:base64:6]',
                },
            ],
        ],
    };
};
