import { createContext, useContext, useState } from "react";

export const ContextApi = createContext();

const getInitialToken = () => {
    const savedToken = localStorage.getItem("JWT_TOKEN");
    if (savedToken) {
        try {
            return JSON.parse(savedToken);
        } catch (e) {
            return savedToken;
        }
    }
    return null;
};

export const ContextProvider = ({ children }) => {
    const [token, setTokenState] = useState(getInitialToken());

    const setToken = (newToken) => {
        setTokenState(newToken);
        if (newToken) {
            localStorage.setItem("JWT_TOKEN", JSON.stringify(newToken));
        } else {
            localStorage.removeItem("JWT_TOKEN");
        }
    };

    return (
        <ContextApi.Provider value={{ token, setToken }}>
            {children}
        </ContextApi.Provider>
    );
};

export const useStoreContext = () => useContext(ContextApi);
