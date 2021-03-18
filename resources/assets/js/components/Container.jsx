import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';

import * as AppPropTypes from '../lib/PropTypes';
import { SiteProvider } from '../contexts/SiteContext';
import { RoutesProvider } from '../contexts/RoutesContext';
import { KeysProvider } from '../contexts/KeysContext';
import { ApiProvider } from '../contexts/ApiContext';
import App from './App';

const propTypes = {
    locale: PropTypes.string.isRequired,
    translations: AppPropTypes.translations.isRequired,
    user: AppPropTypes.user,
    routes: AppPropTypes.routes.isRequired,
    children: PropTypes.node.isRequired,
};

const defaultProps = {
    user: null,
};

const Container = ({ locale, translations, user, routes, children }) => (
    <IntlProvider locale={locale} messages={translations[locale] || translations}>
        <BrowserRouter>
            <SiteProvider locales={locales}>
                <RoutesProvider routes={routes}>
                    <KeysProvider keys={keys}>
                        <ApiProvider>
                            <App />
                        </ApiProvider>
                    </KeysProvider>
                </RoutesProvider>
            </SiteProvider>
        </BrowserRouter>
    </IntlProvider>
);

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default Container;
