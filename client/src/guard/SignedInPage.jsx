import { AuthContext } from "@/context/AuthContext"
import { useContext } from "react"
import { Navigate } from "react-router-dom"

const SignedInPage = (props) => {
    const { currentUser } = useContext(AuthContext)

    if (currentUser) {
        return props.children

    }
    return (
        <Navigate to="/"></Navigate>
    )

}

export default SignedInPage