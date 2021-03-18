/* eslint-disable no-unused-vars, no-console */
import React, { useRef, useEffect } from 'react';

import Logo from '../icons/Folklore';

import styles from '../../../styles/pages/home.module.scss';

const propTypes = {};

const defaultProps = {};

const HomePage = () => (
    <div className={styles.container}>
        <a
            className={styles.logoContainer}
            href="https://folkloreinc.ca/fr"
            target="_blank"
            rel="no-opener noreferrer"
        >
            <Logo className={styles.logo} color="#fff" />
        </a>
    </div>
);
HomePage.propTypes = propTypes;
HomePage.defaultProps = defaultProps;

export default HomePage;
