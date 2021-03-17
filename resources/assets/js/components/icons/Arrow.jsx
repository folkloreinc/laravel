import React from 'react';
import PropTypes from 'prop-types';

import * as AppPropTypes from '../../lib/PropTypes';

const directionTransform = {
    right: null,
    left: 'rotate(180) translate(-30, -30)',
    top: 'rotate(180) translate(0, -30)',
    bottom: 'rotate(180) translate(0, 30)',
};

const propTypes = {
    direction: AppPropTypes.arrowDirection,
    color: AppPropTypes.color,
    backgroundColor: AppPropTypes.color,
    className: PropTypes.string,
};

const defaultProps = {
    direction: 'right',
    color: 'currentColor',
    backgroundColor: '#231f20',
    className: null,
};

const Arrow = ({ direction, color, backgroundColor, className }) => (
    <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0"
        y="0px"
        width="30px"
        height="30px"
        viewBox="0 0 30 30"
        className={className}
        xmlSpace="preserve"
    >
        <g transform={directionTransform[direction]}>
            <path
                fill={backgroundColor}
                d="M15,30L15,30C6.7,30,0,23.3,0,15v0C0,6.7,6.7,0,15,0h0c8.3,0,15,6.7,15,15v0C30,23.3,23.3,30,15,30z"
            />
            <path fill={color || 'currentColor'} d="M18.4,14.3L14,10l1-1l6,6l-6,6l-1-1.1l4.3-4.2H9v-1.4H18.4z" />
        </g>
    </svg>
);

Arrow.propTypes = propTypes;
Arrow.defaultProps = defaultProps;

export default Arrow;
