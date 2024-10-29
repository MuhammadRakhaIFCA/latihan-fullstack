import { FaUserFriends } from "react-icons/fa"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { useContext } from "react"
import { AuthContext } from "@/context/AuthContext"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { axiosExpress } from "@/lib/axios"

export const Rightbar = () => {
    const { currentUser } = useContext(AuthContext)
    const queryClient = useQueryClient()

    const { data: followedUsers = [], isLoading: loadingUsers } = useQuery({
        queryKey: ["followedUsers"],
        queryFn: () => axiosExpress.get(`users/followed/${currentUser.id}`)
    })
    const { data: unfollowedUsers = [], isLoading: loadingnewUsers } = useQuery({
        queryKey: ["unfollowedUsers"],
        queryFn: () => axiosExpress.get(`users/unfollowed/${currentUser.id}`)
    })
    if (loadingUsers || loadingnewUsers) {
        return (
            <p>loading users</p>
        )
    }
    return (
        <>
            <ScrollArea className="flex flex-col w-[20%] h-screen content-between pl-3">
                <div className="my-10">
                    <p>suggested for you</p>
                    <div className="flex flex-row gap-3 items-center my-3">
                        <FaUserFriends className="w-7 " />
                        <span>user name</span>
                        <Button className="bg-blue-500 h-6" >Follow</Button>
                    </div>
                    <div className="flex flex-row gap-3 items-center my-3">
                        <FaUserFriends className="w-7 " />
                        <span>user name</span>
                        <Button className="bg-blue-500 h-6">Follow</Button>
                    </div>
                    <div className="flex flex-row gap-3 items-center my-3">
                        <FaUserFriends className="w-7 " />
                        <span>user name</span>
                        <Button className="bg-blue-500 h-6">Follow</Button>
                    </div>
                </div>
                <div className="my-10">
                    <p>latest activities</p>
                    {
                        followedUsers ? followedUsers.data.map((user) => {
                            return (
                                <div className="flex flex-row gap-3 items-center my-3">
                                    <img className="rounded-full w-7 h-7" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                                    <span>{user.username}</span>
                                </div>
                            )
                        }) : <p>no friends</p>
                    }
                </div>
                <div className="my-10">
                    <p>online friends</p>
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="flex flex-row gap-3 items-center my-3">
                            <FaUserFriends className="w-7" />
                            <span>user name</span>
                        </div>
                    ))}
                </div>


            </ScrollArea>
        </>
    )
}