import { AuthContext } from "@/context/AuthContext"
import { useContext } from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const SignedInPage = (props) => {
    const { currentUser } = useContext(AuthContext)

    if (!currentUser.id) {

        return (
            <Navigate to="/"></Navigate>
        )
    }

    return props.children
}

export default SignedInPage