import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import { useUrlGenerator } from './RoutesContext';
import Api from '../lib/api/Api';

const ApiContext = React.createContext(null);

export const useApi = () => useContext(ApiContext);

const propTypes = {
    children: PropTypes.node.isRequired,
    api: PropTypes.instanceOf(Api),
};

const defaultProps = {
    api: null,
};

export const ApiProvider = ({ api: initialApi, children }) => {
    const generateUrl = useUrlGenerator();
    const api = useMemo(() => {
        if (initialApi !== null) {
            return initialApi;
        }
        return new Api({
            generateUrl,
        });
    }, [generateUrl, initialApi]);
    return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};

ApiProvider.propTypes = propTypes;
ApiProvider.defaultProps = defaultProps;

export default ApiContext;
