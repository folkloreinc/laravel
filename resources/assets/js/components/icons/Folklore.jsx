import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    className: PropTypes.string,
    color: PropTypes.string,
};

const defaultProps = {
    className: null,
    color: '#ff0100',
};

const Folklore = ({ className, color }) => (
    <svg
        width="360" height="520" viewBox="0 0 360 520" fill="none" xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path d="M340 20H20V500H180V340H260V180H340V20Z" stroke={color} strokeWidth="40" strokeMiterlimit="10"/>
    </svg>
);

Folklore.propTypes = propTypes;
Folklore.defaultProps = defaultProps;

export default Folklore;
