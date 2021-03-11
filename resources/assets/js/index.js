import domready from 'domready';
import React from 'react';
import { render } from 'react-dom';

const needsPolyfill = () =>
    typeof window.Intl === 'undefined' ||
    typeof window.Intl.PluralRules === 'undefined' ||
    typeof window.IntersectionObserver === 'undefined' ||
    typeof window.ResizeObserver === 'undefined';

const boot = () => {
    const renderApp = (App) => {
        const propsEl = document.getElementById('app-props');
        const props = propsEl !== null ? JSON.parse(propsEl.innerHTML) || {} : {};
        const appEl = document.getElementById('app');
        render(React.createElement(App, props), appEl);
    }

    const onLoaded = ({ default: App }) => renderApp(App);

    if (needsPolyfill()) {
        import(/* webpackChunkName: "app-polyfill" */'./app.polyfill').then(onLoaded);
    } else {
        import(/* webpackChunkName: "app" */'./app').then(onLoaded);
    }
}

const ready = (document.readyState || 'loading') !== 'loading';
if (ready) {
    boot();
} else {
    domready(boot);
}
