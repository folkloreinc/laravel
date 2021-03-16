/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { label as labelPropTypes } from '../../lib/PropTypes';
import { isMessage } from '../../lib/utils';

const propTypes = {
    children: labelPropTypes.isRequired,
    values: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

const defaultProps = {
    values: {},
};

const Label = ({ children, values }) =>
    isMessage(children) ? (
        <FormattedMessage
            values={{
                ...values,
                strong: (chunks) => <strong>{chunks}</strong>,
                small: (chunks) => <small>{chunks}</small>,
                em: (chunks) => <em>{chunks}</em>,
                h1: (chunks) => <h1>{chunks}</h1>,
                h2: (chunks) => <h2>{chunks}</h2>,
                p: (chunks) => <p>{chunks}</p>,
                ul: (chunks) => <ul>{chunks}</ul>,
                li: (chunks) => <li>{chunks}</li>,
            }}
            {...children}
        />
    ) : (
        children
    );

Label.propTypes = propTypes;
Label.defaultProps = defaultProps;

export default Label;
