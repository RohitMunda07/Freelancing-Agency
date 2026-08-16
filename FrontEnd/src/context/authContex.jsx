import React, { createContext, useContext, useEffect, useState } from "react";
import { post } from "../axios/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

function getStoredUser() {
    try {
        const cachedUser = localStorage.getItem("user");
        return cachedUser ? JSON.parse(cachedUser) : null;
    } catch {
        localStorage.removeItem("user");
        return null;
    }
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => getStoredUser());
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(false);
    }, []);

    // Call this with the `user` object from a successful login response.
    // Deliberately does NOT accept or store an access token — that already
    // lives in an httpOnly cookie set by the backend, which JS can't (and
    // shouldn't be able to) read. Storing it here too would undo that
    // protection and give any future XSS bug a much easier way to steal it.
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = async () => {
        setUser(null);
        localStorage.removeItem("user");
        try {
            const response = await post("/user/users/logout");
            console.log("Logout Response", response.data);
            navigate("/");
        } catch (error) {
            console.log(error.response?.message || "Error while making a logout request");
        }
    };

    const value = {
        user,
        isLoggedIn: !!user,
        isLoading,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used inside an <AuthProvider>");
    }
    return ctx;
}