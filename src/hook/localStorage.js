import { useState } from "react";

export const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        const data = localStorage.getItem(key);

        return data !== null ? JSON.parse(data) : defaultValue;
    });
    
    const setLocalStorage = (value) => {

        localStorage.setItem(key, JSON.stringify(value));
        setValue(value);
    };

    return [value, setLocalStorage];
};