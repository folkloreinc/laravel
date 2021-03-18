import React from 'react';
import PropTypes from 'prop-types';

import * as AppPropTypes from '../lib/PropTypes';
import Container from './Container';
// import Routes from './panneau/Routes';

import '../../styles/panneau.global.scss';

const propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    definition: PropTypes.object.isRequired,
    user: AppPropTypes.user,
    sanctumPrefix: PropTypes.string.isRequired,
    statusCode: AppPropTypes.statusCode,
};

const defaultProps = {
    user: null,
    statusCode: null,
};

const Panneau = ({ definition, user, sanctumPrefix, statusCode }) => {
    const {
        localization: { locale = 'en', messages: translations } = {},
        routes = {},
    } = definition;
    const isAuthorized = statusCode !== 401 && statusCode !== 403;
    return (
        // <PanneauProvider definition={definition}>
        <Container
            locale={locale}
            translations={translations}
            routes={routes}
            sanctumPrefix={sanctumPrefix}
            user={isAuthorized ? user : null}
            isPanneau
        >
            Panneau
        </Container>
        // </PanneauProvider>
    );
};
Panneau.propTypes = propTypes;
Panneau.defaultProps = defaultProps;

export default Panneau;
