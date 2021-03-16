import React, { useState, useRef, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { Switch, Route, useLocation } from 'react-router';

import { useRoutes } from '../contexts/RoutesContext';
// import { useUser } from '../contexts/AuthContext';

import MainLayout from './layouts/Main';
import HomePage from './pages/Home';
import ErrorPage from './pages/Error';

import * as AppPropTypes from '../lib/PropTypes';

const propTypes = {
    statusCode: AppPropTypes.statusCode,
};

const defaultProps = {
    statusCode: null,
};

const AppRoutes = ({ statusCode: initialStatusCode }) => {
    const routes = useRoutes();
    // const route = useUrlGenerator();
    // const user = useUser();

    const [statusCode, setStatusCode] = useState(initialStatusCode);
    const location = useLocation();
    const initialLocationRef = useRef(location);
    useEffect(() => {
        if (initialLocationRef.current !== location) {
            setStatusCode(null);
        }
    }, [location]);

    return (
        <MainLayout>
            <Switch>
                <Route path={routes.home} exact component={HomePage} />
                <Route path="*" component={ErrorPage} />
            </Switch>
        </MainLayout>
    );
};
AppRoutes.propTypes = propTypes;
AppRoutes.defaultProps = defaultProps;

export default AppRoutes;
