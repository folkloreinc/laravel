import React from 'react';

import Logo from '../icons/Folklore';

import styles from '../../../styles/pages/home.module.scss';

const propTypes = {};

const defaultProps = {};

const HomePage = () => (
    <div className={styles.container}>
        <div className={styles.logoContainer}>
            <a href="https://folkloreinc.ca/fr" target="_blank" rel="no-opener noreferrer">
                <Logo className={styles.logo} />
            </a>
        </div>
    </div>
);
HomePage.propTypes = propTypes;
HomePage.defaultProps = defaultProps;

export default HomePage;
