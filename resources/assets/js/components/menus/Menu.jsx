/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import * as AppPropTypes from '../../lib/PropTypes';
import Label from '../partials/Label';

import styles from '../../styles/menus/menu.module.scss';

const propTypes = {
    items: AppPropTypes.menuItems,
    onClick: PropTypes.func,
    menuComponent: PropTypes.func,
    className: PropTypes.string,
    itemsClassName: PropTypes.string,
    itemClassName: PropTypes.string,
    linkClassName: PropTypes.string,
    activeItemClassName: PropTypes.string,
};

const defaultProps = {
    items: [],
    onClick: null,
    menuComponent: null,
    className: null,
    itemsClassName: null,
    itemClassName: null,
    linkClassName: null,
    activeItemClassName: null,
};

const Menu = ({
    items,
    menuComponent,
    onClick,
    className,
    itemsClassName,
    itemClassName,
    linkClassName,
    activeItemClassName,
}) => (
    <nav
        className={classNames([
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
    >
        <ul
            className={classNames([
                styles.items,
                {
                    [itemsClassName]: itemsClassName !== null,
                },
            ])}
        >
            {items.map(
                (
                    {
                        label,
                        url,
                        active = false,
                        external = false,
                        target = '_blank',
                        rel = 'noopener noreferrer',
                    },
                    index,
                ) => {
                    const Component = menuComponent !== null ? menuComponent : null;

                    let comp = null;

                    if (Component) {
                        comp = <Component label={label} url={url} active={active} />;
                    } else if (external) {
                        comp = (
                            <a
                                href={url}
                                className={classNames([
                                    styles.link,
                                    {
                                        [linkClassName]: linkClassName !== null,
                                    },
                                ])}
                                target={target}
                                rel={rel}
                            >
                                <Label>{label}</Label>
                            </a>
                        );
                    } else {
                        comp = (
                            <Link
                                to={url}
                                className={classNames([
                                    styles.link,
                                    {
                                        [linkClassName]: linkClassName !== null,
                                    },
                                ])}
                                onClick={onClick}
                            >
                                <Label>{label}</Label>
                            </Link>
                        );
                    }

                    return (
                        <li
                            className={classNames([
                                styles.item,
                                {
                                    [itemClassName]: itemClassName !== null,
                                    [activeItemClassName]: active && activeItemClassName !== null,
                                    [styles.active]: active,
                                },
                            ])}
                            key={`menu-item-${index}`}
                        >
                            {comp}
                        </li>
                    );
                },
            )}
        </ul>
    </nav>
);

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default Menu;
