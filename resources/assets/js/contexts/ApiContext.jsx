/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import { useUrlGenerator } from './RoutesContext';
import Api from '../lib/api/Api';
import PanneauApi from '../lib/api/Panneau';

const ApiContext = React.createContext(null);

export const useApi = () => useContext(ApiContext);

const propTypes = {
    children: PropTypes.node.isRequired,
    api: PropTypes.instanceOf(Api),
    sanctumPrefix: PropTypes.string,
    isPanneau: PropTypes.bool,
};

const defaultProps = {
    api: null,
    sanctumPrefix: 'sanctum',
    isPanneau: false,
};

export const ApiProvider = ({ api: initialApi, sanctumPrefix, isPanneau, children }) => {
    const generateUrl = useUrlGenerator();
    const api = useMemo(() => {
        if (initialApi !== null) {
            return initialApi;
        }
        return isPanneau
            ? new PanneauApi({
                  generateUrl,
                  sanctumPrefix,
              })
            : new Api({
                  generateUrl,
                  sanctumPrefix,
              });
    }, [generateUrl, initialApi, sanctumPrefix, isPanneau]);
    return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};

ApiProvider.propTypes = propTypes;
ApiProvider.defaultProps = defaultProps;

export default ApiContext;
