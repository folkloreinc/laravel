import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

const propTypes = {
    locale: PropTypes.string,
    translations: PropTypes.objectOf(PropTypes.string),
};

const defaultProps = {
    locale: 'en',
    translations: {},
};

const Container = ({ locale, translations }) => (
    <IntlProvider locale={locale} translations={translations}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </IntlProvider>
);

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default Container;
