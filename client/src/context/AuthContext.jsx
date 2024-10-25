import { axiosExpress } from "@/lib/axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    )


    const login = async (values) => {
        const result = await axiosExpress.post("/users/login", values, {
            withCredentials: true
        })
        setCurrentUser(result.data)
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])

    return (
        <AuthContext.Provider value={{ currentUser, login }}>
            {children}
        </AuthContext.Provider>
    )
}