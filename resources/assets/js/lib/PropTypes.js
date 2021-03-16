import PropTypes from 'prop-types';

/**
 * Core
 */

export const translation = PropTypes.string;
export const translations = PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    PropTypes.objectOf(PropTypes.string),
]);

export const routes = PropTypes.objectOf(PropTypes.string);

export const intl = PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
});

export const message = PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string,
});

export const text = PropTypes.oneOfType([message, PropTypes.string]);

export const label = PropTypes.oneOfType([message, PropTypes.node]);

export const statusCode = PropTypes.oneOf([404, 401, 403, 500]);

export const ref = PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
        current: PropTypes.any, // eslint-disable-line react/forbid-prop-types
    }),
]);

/**
 * Forms
 */
export const errors = PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]);
export const formErrors = PropTypes.objectOf(errors);

export const selectOption = PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
});
export const selectOptions = PropTypes.arrayOf(selectOption);

export const formField = PropTypes.shape({
    value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
    name: PropTypes.string,
});
export const formFields = PropTypes.objectOf(formField);

/**
 * Auth
 */
export const user = PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
});

/**
 * Menu
 */
export const menuItem = PropTypes.shape({
    id: PropTypes.string,
    label,
    url: PropTypes.string,
    external: PropTypes.bool,
    active: PropTypes.bool,
});
export const menuItems = PropTypes.arrayOf(menuItem);
export const menus = PropTypes.objectOf(menuItems);

/**
 * Resources
 */
export const date = PropTypes.string;

export const localized = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(PropTypes.string),
]);

export const imageSize = PropTypes.shape({
    url: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
});
export const imageSizes = PropTypes.arrayOf(imageSize);

export const image = PropTypes.shape({
    url: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    sizes: imageSizes,
});

export const video = PropTypes.shape({
    url: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    duration: PropTypes.number,
});
export const videos = PropTypes.arrayOf(video);

export const page = PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
});
export const pages = PropTypes.arrayOf(page);

export const pageMetadata = PropTypes.shape({});
