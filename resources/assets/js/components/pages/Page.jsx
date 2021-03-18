import React, { useRef, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router';

import { getComponentFromName } from '../../lib/utils';
import { usePage } from '../../contexts/PagesContext';
import { useUrlGenerator } from '../contexts/RoutesContext';
import * as PageComponents from './pages';
import ErrorPage from './Error';

const propTypes = {};

const defaultProps = {};

const Page = () => {
    const {
        params: { page_slug: pageSlug },
    } = useRouteMatch();
    const route = useUrlGenerator();
    const url = route('page', {
        page_slug: pageSlug,
    });
    const { page, error } = usePage(url);
    const lastPageRef = useRef(page);

    useEffect(() => {
        if (page !== null) {
            lastPageRef.current = page;
        }
    }, [page]);

    if (error) {
        return <ErrorPage statusCode={404} />;
    }

    const currentPage = page || lastPageRef.current;

    const PageComponent =
        currentPage !== null
            ? getComponentFromName(PageComponents, currentPage.type, 'page')
            : null;
    return PageComponent !== null ? <PageComponent page={currentPage} /> : null;
};

Page.propTypes = propTypes;
Page.defaultProps = defaultProps;

export default Page;
