/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isObject from 'lodash/isObject';

import * as AppPropTypes from '../../lib/PropTypes';

import Label from '../partials/Label';

import styles from '../../../styles/fields/checkbox.module.scss';

const propTypes = {
    name: PropTypes.string.isRequired,
    itemName: PropTypes.string,
    type: PropTypes.string,
    errors: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    children: AppPropTypes.label,
    required: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    itemName: null,
    type: 'checkbox',
    errors: [],
    value: null,
    children: null,
    required: false,
    className: null,
    onChange: null,
};

const CheckboxField = ({
    type,
    errors,
    name,
    itemName,
    value,
    children,
    required,
    onChange,
    className,
}) => {
    const onInputChange = useCallback(
        (e) => {
            const newValue =
                itemName !== null
                    ? {
                          ...value,
                          [itemName]: e.target.checked,
                      }
                    : e.target.checked;
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [value, itemName, onChange],
    );
    const inputName = itemName !== null ? `${name}[${itemName}]` : name;
    const inputValue = isObject(value) && itemName !== null ? value[itemName] || false : value;
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.hasErrors]: errors !== null && errors.length > 0,
                    [className]: className !== null,
                },
            ])}
        >
            <label htmlFor={inputName} className={styles.inner}>
                <input
                    type={type}
                    id={inputName}
                    name={inputName}
                    checked={inputValue || false}
                    value="1"
                    onChange={onInputChange}
                    required={required}
                    className={styles.input}
                />
                <span className={styles.label}>
                    <Label>{children}</Label>
                </span>
            </label>
        </div>
    );
};

CheckboxField.propTypes = propTypes;
CheckboxField.defaultProps = defaultProps;

export default CheckboxField;
