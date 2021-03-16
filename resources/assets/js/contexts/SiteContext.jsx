import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const SiteContext = React.createContext(null);

export const useSite = () => useContext(SiteContext);

const propTypes = {
    children: PropTypes.node.isRequired,
};

const defaultProps = {};

export const SiteProvider = ({ children }) => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const onResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, [setWindowSize]);

    return <SiteContext.Provider value={{ windowSize }}>{children}</SiteContext.Provider>;
};

SiteProvider.propTypes = propTypes;
SiteProvider.defaultProps = defaultProps;

export default SiteContext;
