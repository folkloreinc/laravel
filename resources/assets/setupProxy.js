const { createProxyMiddleware } = require('http-proxy-middleware');
require('@folklore/react-scripts/config/env');
const { prepareProxy } = require('react-dev-utils/WebpackDevServerUtils');
const paths = require('@folklore/react-scripts/config/paths');

module.exports = (app) => {
    const proxy = process.env.PROXY;
    const [{ context, onProxyReq, ...proxyConfig }] = prepareProxy(
        proxy,
        paths.appPublic,
        paths.publicUrlOrPath,
    );
    app.use(
        createProxyMiddleware(
            (pathname, req) => {
                if (pathname.match(/\.hot-update\./) !== null) {
                    return false;
                }
                return (
                    !pathname.startsWith('/static/') &&
                    (context(pathname, req) ||
                        (req.headers.accept && req.headers.accept.indexOf('text/html') !== -1))
                );
            },
            {
                ...proxyConfig,
                changeOrigin: false,
                onProxyReq: (proxyReq) => {
                    onProxyReq(proxyReq);
                    proxyReq.setHeader('X-WEBPACK-DEV-SERVER', true);
                },
            },
        ),
    );
};
