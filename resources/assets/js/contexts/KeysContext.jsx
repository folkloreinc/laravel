import React, { useContext } from 'react';
import PropTypes from 'prop-types';

const KeysContext = React.createContext(null);

export const useKeys = () => useContext(KeysContext);

export const useKey = (name) => {
    const keys = useKeys();
    return keys[name] || null;
};

const propTypes = {
    keys: PropTypes.shape({
        stripe: PropTypes.string,
    }),
    children: PropTypes.node.isRequired,
};

const defaultProps = {
    keys: null,
};

export const KeysProvider = ({ keys, children }) => (
    <KeysContext.Provider value={keys}>{children}</KeysContext.Provider>
);

KeysProvider.propTypes = propTypes;
KeysProvider.defaultProps = defaultProps;

export default KeysContext;
