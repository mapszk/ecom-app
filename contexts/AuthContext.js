import React from 'react'
import { useEffect, useState } from "react"
import { auth } from "../util/firebaseClient"
import Loader from '../components/Loader'
import nookies from 'nookies'

export const AuthContext = React.createContext()

const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        return auth.onIdTokenChanged(async user=> {
            setLoading(true)
            if(!user){
                setUser(null)
                nookies.set(undefined, 'token', '', {path: '/'})
                setLoading(false)
            }else{
                const token = await user.getIdToken()
                setUser(user)
                nookies.set(undefined, 'token', token, {path: '/'})
                setLoading(false)
            }
        })
    }, [])
    useEffect(()=>{
        const handle = setInterval(async ()=> {
            const user = auth.currentUser
            if(user) await user.getIdToken(true)
        }, 10 * 60 * 1000)
        return () => clearInterval(handle)
    }, [])
    return (
        <AuthContext.Provider value={{user}}>
            {loading ? <Loader/> : children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
