import { AuthContext } from "@/context/AuthContext"
import { useContext } from "react"
import { Navigate } from "react-router-dom"

const GuestPage = (props) => {
    const { currentUser } = useContext(AuthContext)

    if (currentUser.id) {
        return (
            <Navigate to="/home"></Navigate>
        )
    }

    return props.children
}

export default GuestPage