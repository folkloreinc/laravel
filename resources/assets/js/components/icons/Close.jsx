import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    color: PropTypes.string,
    withCircle: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    color: 'currentColor',
    withCircle: false,
    className: null,
};

const CloseIcon = ({ color, withCircle, className }) => (
    <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="30.5px"
        height="30.5px"
        viewBox="0 0 30.5 30.5"
        xmlSpace="preserve"
        className={className}
    >
        <line
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeMiterlimit="10"
            x1="22.5"
            y1="7.5"
            x2="7.5"
            y2="22.5"
        />
        <line
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeMiterlimit="10"
            x1="22.5"
            y1="22.5"
            x2="7.5"
            y2="7.5"
        />
        {withCircle ? (
            <circle
                fill="none"
                stroke={color}
                strokeWidth="1"
                strokeMiterlimit="10"
                cx="15"
                cy="15"
                r="14"
            />
        ) : null}
    </svg>
);

CloseIcon.propTypes = propTypes;
CloseIcon.defaultProps = defaultProps;

export default CloseIcon;
