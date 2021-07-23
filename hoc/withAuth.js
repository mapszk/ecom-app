import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import LoginPage from '../pages/login'

const withAuth = Component => {
    const Auth = (props) => {
        const router = useRouter()
        const { user } = useAuth()
        useEffect(()=>{
            if(!user) router.push({pathname: '/login'}, undefined, {shallow: true})
        }, [user])
        if(!user){
            return <LoginPage />
        }
        return (
            <Component {...props} />
        )
    }
    if(Component.getInitialProps){
        Auth.getInitialProps = Component.getInitialProps;
    }
    if(Component.getServerSideProps){
        Auth.getServerSideProps = Component.getServerSideProps;
    }
    return Auth
}

export default withAuth
