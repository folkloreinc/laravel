/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import * as AppPropTypes from '../lib/PropTypes';
import { KeysProvider } from '../contexts/KeysContext';
import { SiteProvider } from '../contexts/SiteContext';
import Container from './Container';
import Routes from './Routes';

import '../../styles/styles.global.scss';

const propTypes = {
    locale: PropTypes.string.isRequired,
    locales: PropTypes.arrayOf(PropTypes.string).isRequired,
    translations: AppPropTypes.translations.isRequired,
    routes: AppPropTypes.routes.isRequired,
    user: AppPropTypes.user,
};

const defaultProps = {
    user: null,
};

const App = ({ locale, locales, translations, routes, user }) => {
    const keys = useMemo(
        () => ({
            key: null,
        }),
        [],
    );
    return (
        <KeysProvider keys={keys}>
            <SiteProvider locales={locales}>
                <Container locale={locale} translations={translations} routes={routes} user={user}>
                    <Routes />
                </Container>
            </SiteProvider>
        </KeysProvider>
    );
};
App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
