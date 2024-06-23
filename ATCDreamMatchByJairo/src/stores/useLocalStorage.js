const useLocalStorage = (key, initialValue) => {
    const setItem = value => {
        window.localStorage.setItem(key, JSON.stringify(value));
    };

    const getItem = () => {
        const localStorageValue = window.localStorage.getItem(key);
        if (localStorageValue === null) {
            return initialValue;
        }
        return JSON.parse(localStorageValue);
    };

    const removeItem = () => {
        window.localStorage.removeItem(key);
    }
    return {setItem, getItem, removeItem};
}

export default useLocalStorage;