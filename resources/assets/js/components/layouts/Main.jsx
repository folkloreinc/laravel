import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useFonts } from '@folklore/fonts';

import styles from '../../styles/layouts/main.module.scss';

const propTypes = {
    children: PropTypes.node.isRequired,
    fonts: PropTypes.shape({
        google: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
        custom: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
    }),
};

const defaultProps = {
    fonts: {
        google: {
            families: ['Rubik:400,600', 'Open Sans:400'],
        },
        custom: {
            families: ['Apercu'],
        },
    },
};

const MainLayout = ({ fonts, children }) => {
    const { loaded: fontsloaded } = useFonts(fonts);

    const innerStyle = {
        opacity: fontsloaded ? 1 : 0,
    };

    return (
        <div className={classNames([styles.container])}>
            <div className={styles.inner} style={innerStyle}>
                {children}
            </div>
        </div>
    );
};

MainLayout.propTypes = propTypes;
MainLayout.defaultProps = defaultProps;

export default MainLayout;
