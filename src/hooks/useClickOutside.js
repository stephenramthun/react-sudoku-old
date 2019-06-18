import { useEffect } from 'react';

const isParent = (parent, child, maxDepth = 4) => {
    while (child.parentNode !== null && maxDepth > 0) {
        if (child.parentNode === parent) {
            return true;
        }
        child = child.parentNode;
        maxDepth--;
    }
    return false;
};

export const useClickOutside = (callback, ref) => {
    const handleClickOutside = event => {
        if (!isParent(ref.current, event.target)) {
            callback();
        }
    };

    useEffect(() => {
        window.addEventListener('click', handleClickOutside);
        window.addEventListener('touchStart', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
            window.removeEventListener('touchStart', handleClickOutside);
        };
    }, []);
};
