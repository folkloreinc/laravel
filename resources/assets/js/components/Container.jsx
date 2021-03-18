/* eslint-disable no-unused-vars */

import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';

import * as AppPropTypes from '../lib/PropTypes';
import { RoutesProvider } from '../contexts/RoutesContext';
import { ApiProvider } from '../contexts/ApiContext';

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
            <RoutesProvider routes={routes}>
                <ApiProvider>{children}</ApiProvider>
            </RoutesProvider>
        </BrowserRouter>
    </IntlProvider>
);

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default Container;
