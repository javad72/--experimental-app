"use client";
import Cookies from "js-cookie";
import {createContext, useContext, useEffect, useState} from "react";

// ایجاد Context
const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};


export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const storedUsername = Cookies.get("username");
        if (storedUsername) {
            setUser(storedUsername);
        }
    }, [])

    const login = (username) => {
        setUser(username);
        Cookies.set("username", username, { expires: 1 });
    };

    const logout = () => {
        setUser(null);
        Cookies.remove("username");
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

