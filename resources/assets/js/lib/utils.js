import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import { pascalCase } from 'change-case';

export const isMessage = (message) => isObject(message) && typeof message.id !== 'undefined';

export const shuffle = (array) => {
    if (!isArray(array)) {
        return array;
    }
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex]; // eslint-disable-line
        array[randomIndex] = temporaryValue; // eslint-disable-line
    }
    return array;
};

export const getComponentFromName = (components, name, defaultComponentName = null) => {
    const defaultComponent =
        (isString(defaultComponentName)
            ? components[pascalCase(defaultComponentName)] || components[defaultComponentName]
            : defaultComponentName) || null;
    if (name === null) {
        return defaultComponent;
    }
    const componentName = pascalCase(name);
    return components[componentName] || components[name] || defaultComponent;
};

export const getImageSize = (image, size) =>
    image !== null && image !== undefined
        ? (image.sizes || []).find((it) => it.id === size) || image
        : null;

export const getImageSizeUrl = (image, size) => {
    const imageAtSize = getImageSize(image, size);
    return imageAtSize !== null ? imageAtSize.url || null : null;
};

export const convertUppyToMedia = (it) => {
    const type = it.data.type.split('/')[0];
    const thumbnail = it.transloadit[`${type}_thumbnail`] || null;
    const original = it.transloadit[`${type}_original`] || null;
    return {
        handle: it.id,
        type,
        name: it.meta.name,
        mime: it.data.type,
        size: it.data.size,
        url: original !== null ? original.ssl_url || original.url : null,
        thumbnail_url: thumbnail !== null ? thumbnail.ssl_url || thumbnail.url : null,
        metadata: {
            ...(original !== null ? original.meta || null : null),
            filename: it.meta.filename,
            transloadit: it.transloadit.results || null,
        },
    };
};

export const getUniqueArray = (array, key = 'id') => {
    if (!isArray(array)) {
        return array;
    }
    const uniqueIds = [];
    return array.filter((item) => {
        const valid = uniqueIds.indexOf(item[key]) === -1;
        uniqueIds.push(item.id);
        return valid;
    });
};
