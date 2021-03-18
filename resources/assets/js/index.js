import React from 'react';
import ReactDOM from 'react-dom';
import domready from 'domready';

const needsPolyfill = () =>
    typeof window.Intl === 'undefined' ||
    typeof window.Intl.PluralRules === 'undefined' ||
    typeof window.IntersectionObserver === 'undefined' ||
    typeof window.ResizeObserver === 'undefined';

const boot = () => {
    const propsEl = document.getElementById('app-props');
    const props = propsEl !== null ? JSON.parse(propsEl.innerHTML) || {} : {};

    const renderApp = (App) => {
        const appEl = document.getElementById('app');
        const app = React.createElement(App, props);
        ReactDOM.render(app, appEl);
    };

    const onAppLoaded = ({ default: App }) => renderApp(App);

    const withPolyfills = needsPolyfill();
    if (withPolyfills) {
        import(/* webpackChunkName: "app-polyfill" */ './app.polyfill').then(onAppLoaded);
    } else {
        import(/* webpackChunkName: "app" */ './components/App').then(onAppLoaded);
    }
};

const ready = (document.readyState || 'loading') !== 'loading';
if (ready) {
    boot();
} else {
    domready(boot);
}
