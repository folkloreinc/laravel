import { postJSON, getJSON, getCSRFHeaders } from '@folklore/fetch';
import { stringify as stringifyQuery } from 'query-string';

class Base {
    constructor(opts = {}) {
        this.options = {
            generateUrl: null,
            sanctumPrefix: 'sanctum',
            ...opts,
        };

        this.sessionRequested = false;
    }

    route(route, params) {
        const { generateUrl } = this.options;
        return generateUrl(route, params);
    }

    fetchPost(path, data, opts) {
        return this.fetch(path, 'POST', data, opts);
    }

    requestGet(path, data, opts = {}) {
        return this.request(path, 'GET', data, opts);
    }

    requestPost(path, data, opts = {}) {
        return this.request(path, 'POST', data, opts);
    }

    requestPut(path, data, opts = {}) {
        return this.request(path, 'PUT', data, opts);
    }

    requestPatch(path, data, opts = {}) {
        return this.request(path, 'PATCH', data, opts);
    }

    requestDelete(path, data, opts = {}) {
        return this.request(path, 'DELETE', data, opts);
    }

    fetch(path, method, data, opts) {
        const queryString =
            method === 'GET' && data !== null
                ? stringifyQuery(data, { arrayFormat: 'bracket' })
                : null;
        const url = `${path}${
            queryString !== null && queryString.length > 0 ? `?${queryString}` : ''
        }`;
        const { withCredentials = false, ...otherOptions } = opts || {};
        const requestOptions = withCredentials
            ? {
                  credentials: 'include',
                  headers: getCSRFHeaders(),
                  ...this.options,
                  ...otherOptions,
              }
            : { ...this.options, ...otherOptions };

        const { headers, ...options } = requestOptions || {};

        return fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                ...(headers || null),
            },
            body: JSON.stringify(data),
            ...(options || null),
        }).catch((e) => console.log(e)); // eslint-disable-line
    }

    // eslint-disable-next-line class-methods-use-this
    request(path, method, data = null, opts = {}) {
        const finalMethod = method !== 'GET' ? 'POST' : 'GET';
        const needsMethodOverride = finalMethod !== method;
        const queryString =
            finalMethod === 'GET' && data !== null
                ? stringifyQuery(data, { arrayFormat: 'bracket' })
                : null;
        const url = `${path}${
            queryString !== null && queryString.length > 0 ? `?${queryString}` : ''
        }`;
        const { withCredentials = false, ...otherOptions } = opts || {};
        const requestOptions = withCredentials
            ? {
                  credentials: 'include',
                  headers: getCSRFHeaders(),
                  ...otherOptions,
              }
            : otherOptions;

        const request = () =>
            finalMethod === 'POST'
                ? postJSON(
                      url,
                      needsMethodOverride
                          ? {
                                _method: method,
                                ...data,
                            }
                          : data,
                      requestOptions,
                  )
                : getJSON(url, requestOptions);
        return request();
    }
}

export default Base;
