import {useEffect, useState} from 'react';
import useLoadingStore from '../stores/loadingStore';

// hook to debounce input value

export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    const { setIsLoading } = useLoadingStore(state => state);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        
        return () => {
            if (value.trim().length > 0) {
                setIsLoading(true);
            } else {
                setIsLoading(false);
            }
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
};