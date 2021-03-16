import React /* , { useMemo } */ from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';

import * as AppPropTypes from '../lib/PropTypes';
import { RoutesProvider } from '../contexts/RoutesContext';
import { AuthProvider } from '../contexts/AuthContext';
import { ApiProvider } from '../contexts/ApiContext';

const propTypes = {
    locale: PropTypes.string.isRequired,
    translations: AppPropTypes.translations.isRequired,
    user: AppPropTypes.user,
    routes: AppPropTypes.routes.isRequired,
    sanctumPrefix: PropTypes.string.isRequired,
    isPanneau: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

const defaultProps = {
    isPanneau: false,
    user: null,
};

const Container = ({ locale, translations, user, routes, isPanneau, sanctumPrefix, children }) => (
    <IntlProvider locale={locale} messages={translations[locale] || translations}>
        <BrowserRouter>
            <RoutesProvider routes={routes}>
                <ApiProvider isPanneau={isPanneau} sanctumPrefix={sanctumPrefix}>
                    <AuthProvider user={user}>{children}</AuthProvider>
                </ApiProvider>
            </RoutesProvider>
        </BrowserRouter>
    </IntlProvider>
);

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default Container;
