import { AuthContext } from "@/context/AuthContext"
import { useContext } from "react"
import { Navigate } from "react-router-dom"

const GuestPage = (props) => {
    const { currentUser } = useContext(AuthContext)

    if (!currentUser) {
        return props.children
    }
    return (
        <Navigate to="/home"></Navigate>
    )
}

export default GuestPage