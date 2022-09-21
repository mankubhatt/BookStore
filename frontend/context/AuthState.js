import { useEffect, useState } from "react";
import authContext from "./authContext";
import axios from 'axios'
import { useRouter } from "next/dist/client/router";

const AuthState = ({ children }) => {

    const [user, setUser] = useState(null)
    const [accessToken, setAccessToken] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
      checkIfUserIsLoggedIn()
    }, [])
    

    const router = useRouter()

    const login = async ({ username, password }) => {
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }

        const body = {
            username,
            password
        }

        try {
            const { data } = await axios.post("http://localhost:3000/api/login", body, config)
            if (data && data.user) {
                setUser(data.user)
            }

            if (data && data.access) {
                setAccessToken(data.access)
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message)
            } else if (error.request) {
                setError("Something went wrong")
            } else {
                setError("Something went wrong")
            }
            console.error("Error", error.message)
            return
        }
        router.push('/')
    }

    const register = async ({ username, email, password, password2 }) => {
        if (password !== password2) {
            setError("Passwords do not match")
            return
        }

        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }

        const body = {
            username,
            email,
            password
        }

        try {
            await axios.post("http://localhost:3000/api/register", body, config)
            login({ username, password })
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message)
            } else if (error.request) {
                setError("Something went wrong")
            } else {
                setError("Something went wrong")
            }
            console.error("Error", error.message)
            return
        }
    }

    const logout = async () => {
        try {
            await axios.post("http://localhost:3000/api/logout")
            setUser(null)
            setAccessToken(null)
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message)
            } else if (error.request) {
                setError("Something went wrong")
            } else {
                setError("Something went wrong")
            }
            console.error("Error", error.message)
            return
        }
    }

    const checkIfUserIsLoggedIn = async () => {
        try {
            const { data } = await axios.post("http://localhost:3000/api/user")
            setAccessToken(data.access)
            setUser(data.user)
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message)
            } else if (error.request) {
                setError("Something went wrong")
            } else {
                setError("Something went wrong")
            }
            console.error("Error", error.message)
            return
        }
    }

    const handleError = () =>{
        setError(null)
    }

    return (
        <authContext.Provider value={{ user, accessToken, error, login, register, logout, handleError }}>
            {children}
        </authContext.Provider>
    )
}

export default AuthState