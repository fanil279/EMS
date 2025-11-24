import Cookies from "js-cookie";

const isDev = window.location.hostname === "localhost";

export const cookieStorage = {
    getItem: (key: string): Promise<string | null> => {
        return Promise.resolve(Cookies.get(key) || null);
    },
    setItem: (key: string, value: string): Promise<void> => {
        Cookies.set(key, value, { 
            expires: 7, 
            secure: !isDev, 
            sameSite: isDev ? "Lax" : "None",
            path: '/',
        });
        return Promise.resolve();
    },
    removeItem: (key: string): Promise<void> => {
        Cookies.remove(key, { path: '/' });
        return Promise.resolve();
    }
};