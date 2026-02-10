

export const cacheData = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
}

export const getCachedData = (key: string) => {
    const cachedData = localStorage.getItem(key);
    return cachedData ? JSON.parse(cachedData) : null;
}

export const removeCachedData = (key: string) => {
    localStorage.removeItem(key);
}

export const clearCachedData = () => {
    localStorage.clear();
}