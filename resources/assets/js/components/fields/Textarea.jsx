/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { injectIntl } from 'react-intl';

import * as AppPropTypes from '../../lib/PropTypes';

import { isMessage } from '../../lib/utils';

import styles from '../../../styles/fields/textarea.module.scss';

const propTypes = {
    intl: AppPropTypes.intl.isRequired,
    name: PropTypes.string,
    value: PropTypes.string,
    errors: AppPropTypes.formErrors,
    placeholder: AppPropTypes.text,
    required: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    name: null,
    value: null,
    errors: null,
    placeholder: null,
    required: false,
    className: null,
    onChange: null,
};

const TextareaField = ({
    intl,
    name,
    value,
    errors,
    placeholder,
    required,
    onChange,
    className,
}) => {
    const onInputChange = useCallback(
        (e) => {
            if (onChange !== null) {
                onChange(e.currentTarget.value);
            }
        },
        [onChange],
    );
    return (
        <textarea
            name={name}
            value={value || ''}
            placeholder={isMessage(placeholder) ? intl.formatMessage(placeholder) : placeholder}
            onChange={onInputChange}
            required={required}
            className={classNames([
                styles.container,
                {
                    [styles.hasErrors]: errors !== null && errors.length > 0,
                    [className]: className !== null,
                },
            ])}
        />
    );
};

TextareaField.propTypes = propTypes;
TextareaField.defaultProps = defaultProps;

export default injectIntl(TextareaField);
