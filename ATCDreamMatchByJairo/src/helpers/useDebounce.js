import {useEffect, useState} from 'react';
import useLoadingStore from '../stores/loadingStore';
import useTeamsStore from '../stores/teamsStore';
// hook to debounce input value

export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    const { getCurrentAddIsOpen } = useTeamsStore(state => state);
    const { setIsLoading } = useLoadingStore(state => state);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        
        return () => {
            if (value.trim().length > 0 && getCurrentAddIsOpen()) {
                setIsLoading(true);
            } else {
                setIsLoading(false);
            }
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
};