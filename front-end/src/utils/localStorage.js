export const getItem = (name) => {
    return JSON.parse(localStorage.getItem(name));
};

export const setItem = (name, value) => {
    return localStorage.setItem(name, JSON.stringify(value));
};

export const removeItem = (name) => {
    return localStorage.removeItem(name);
};

