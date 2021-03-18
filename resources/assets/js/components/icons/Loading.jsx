import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    color: 'currentColor',
    backgroundColor: '#231F20',
    className: null,
};

const LoadingIcon = ({ color, backgroundColor, className }) => (
    <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="40px"
        height="40px"
        viewBox="0 0 40 40"
        className={className}
        xmlSpace="preserve"
    >
        <circle fill={backgroundColor} cx="20" cy="20" r="20" />
        <circle
            cx="20"
            cy="20"
            fill="none"
            stroke={color || 'currentColor'}
            strokeWidth="4"
            r="10"
            strokeDasharray="50 50"
        >
            <animateTransform
                attributeName="transform"
                type="rotate"
                calcMode="linear"
                values="0 20 20;360 20 20"
                keyTimes="0;1"
                dur="1s"
                begin="0s"
                repeatCount="indefinite"
            />
        </circle>
    </svg>
);

LoadingIcon.propTypes = propTypes;
LoadingIcon.defaultProps = defaultProps;

export default LoadingIcon;
