import { useAuth } from "@/resources/user/authentication.service"
import Login from "@/app/login/page"

interface AuthenticatedPageProps {
    children: React.ReactNode
}

export const AuthenticatedPage: React.FC<AuthenticatedPageProps> = ({ children }) => {
    const auth = useAuth();

    if(!auth.isSessionValid()){
        return <Login />
    }

    return (
        <>
            {children}
        </>
    )
}