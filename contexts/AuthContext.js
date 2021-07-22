import React from 'react'
import { Box, Flex, Spinner } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { auth } from "../util/firebaseClient"
import Loader from '../components/Loader'

export const AuthContext = React.createContext()

const AuthContextProvider = ({children}) => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    useEffect(() => {
        setLoading(true)
        const unsubscribe = auth.onAuthStateChanged(async user=>{
            if(!user){
                setUser(null)
                setLoading(false)
                return
            }
            setUser(user)
            setLoading(false)
        })
        return () => {
            setLoading(false)
            unsubscribe()
        }
    }, [])
    return (
        <AuthContext.Provider value={{user}}>
            {loading ? <Loader/> : children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
