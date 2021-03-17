import React, { useRef, useEffect } from 'react';

import { usePage } from '../../contexts/PagesContext';
import { useUrlGenerator } from '../../contexts/RoutesContext';

import styles from '../../../styles/pages/home.module.scss';

const propTypes = {};

const defaultProps = {};

const HomePage = () => {
    const route = useUrlGenerator();
    const url = route('home');
    const { page } = usePage('home');
    const lastPageRef = useRef(page);
    const currentPage = page || lastPageRef.current;

    useEffect(() => {
        if (page !== null) {
            lastPageRef.current = page;
        }
    }, [page]);

    console.log('home page');

    if (page === null) {
        console.log('no page data');
    }

    return (
        <div className={styles.container}>
            <p>Home {currentPage ? currentPage.title : null}</p>
        </div>
    );
};
HomePage.propTypes = propTypes;
HomePage.defaultProps = defaultProps;

export default HomePage;
