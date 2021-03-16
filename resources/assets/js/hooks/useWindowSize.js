import { useState, useCallback, useEffect } from 'react';

import useWindowEvent from './useWindowEvent';

const getWindowSize = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
});

let initialSize = getWindowSize();

const useWindowSize = ({ onChange = null } = {}) => {
    const [size, setSize] = useState(initialSize);

    const onResize = useCallback(() => {
        const newSize = getWindowSize();
        initialSize = newSize;
        setSize(newSize);
        if (onChange !== null) {
            onChange(newSize);
        }
    }, [setSize, onChange]);

    useWindowEvent('resize', onResize);

    useEffect(() => {
        const newSize = getWindowSize();
        initialSize = newSize;
        setSize(newSize);
    }, [setSize]);

    return size;
};

export default useWindowSize;
