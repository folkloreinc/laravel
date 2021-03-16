/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import * as AppPropTypes from '../lib/PropTypes';
import { useApi } from './ApiContext';

const PagesContext = React.createContext(null);

export const usePages = () => useContext(PagesContext);

export const usePage = (url) => {
    const { pages, setPages } = usePages();
    const api = useApi();
    const page = pages[url] || null;
    const [loading, setLoading] = useState(page === null);
    const [error, setError] = useState(false);
    useEffect(() => {
        if (page === null) {
            setLoading(true);
            api.pages
                .findByUrl(url)
                .then((newPage) => {
                    setPages({
                        ...pages,
                        [newPage.url]: newPage,
                    });
                    setLoading(false);
                })
                .catch(() => {
                    setError(true);
                    setLoading(false);
                });
        }
    }, [api, url, page, pages, setPages, setLoading, setError]);
    return {
        error,
        loading,
        page,
    };
};

const propTypes = {
    pages: PropTypes.objectOf(AppPropTypes.page),
    children: PropTypes.node.isRequired,
};

const defaultProps = {
    pages: {},
};

export const PagesProvider = ({ pages: initialPages, children }) => {
    const [pages, setPages] = useState(initialPages || {});
    return (
        <PagesContext.Provider
            value={{
                pages,
                setPages,
            }}
        >
            {children}
        </PagesContext.Provider>
    );
};

PagesProvider.propTypes = propTypes;
PagesProvider.defaultProps = defaultProps;

export default PagesContext;
