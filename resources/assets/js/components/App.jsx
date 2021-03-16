/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import * as AppPropTypes from '../lib/PropTypes';
import { KeysProvider } from '../contexts/KeysContext';
import { PagesProvider } from '../contexts/PagesContext';
import { SiteProvider } from '../contexts/SiteContext';
import Container from './Container';
import Routes from './Routes';

import '../styles/styles.global.scss';

const propTypes = {
    locale: PropTypes.string.isRequired,
    locales: PropTypes.arrayOf(PropTypes.string).isRequired,
    translations: AppPropTypes.translations.isRequired,
    routes: AppPropTypes.routes.isRequired,
    user: AppPropTypes.user,
    pages: PropTypes.objectOf(AppPropTypes.page),
    sanctumPrefix: PropTypes.string.isRequired,
};

const defaultProps = {
    user: null,
    pages: null,
};

const App = ({ locale, locales, translations, routes, user, pages, sanctumPrefix }) => {
    const keys = useMemo(
        () => ({
            key: null,
        }),
        [],
    );
    return (
        <KeysProvider keys={keys}>
            <SiteProvider locales={locales}>
                <PagesProvider pages={pages}>
                    <Container
                        locale={locale}
                        translations={translations}
                        routes={routes}
                        sanctumPrefix={sanctumPrefix}
                        user={user}
                    >
                        <Routes />
                    </Container>
                </PagesProvider>
            </SiteProvider>
        </KeysProvider>
    );
};
App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
