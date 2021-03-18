/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useIntl } from 'react-intl';

import * as AppPropTypes from '../../lib/PropTypes';
import { isMessage } from '../../lib/utils';

import styles from '../../../styles/fields/select.module.scss';

const propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    errors: AppPropTypes.formErrors,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.object),
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    name: null,
    value: null,
    errors: null,
    required: false,
    disabled: false,
    options: [],
    className: null,
    onChange: null,
};

const SelectField = ({
    name,
    value,
    errors,
    required,
    options,
    onChange,
    disabled,
    className,
}) => {
    const intl = useIntl();
    const onInputChange = useCallback(
        (e) => {
            if (onChange !== null) {
                onChange(e.currentTarget.value);
            }
        },
        [onChange],
    );
    return (
        <select
            name={name}
            value={value}
            onChange={onInputChange}
            required={required}
            disabled={disabled}
            className={classNames([
                styles.container,
                {
                    [styles.hasErrors]: errors !== null && errors.length > 0,
                    [className]: className !== null,
                },
            ])}
        >
            {options.map(({ value: optionValue, label: optionLabel }) => (
                <option key={`option-${optionValue}`} value={optionValue}>
                    {isMessage(optionLabel) ? intl.formatMessage(optionLabel) : optionLabel}
                </option>
            ))}
        </select>
    );
};

SelectField.propTypes = propTypes;
SelectField.defaultProps = defaultProps;

export default SelectField;
