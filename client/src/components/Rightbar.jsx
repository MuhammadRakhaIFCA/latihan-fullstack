import { FaUserFriends } from "react-icons/fa"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { useContext } from "react"
import { AuthContext } from "@/context/AuthContext"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { axiosExpress } from "@/lib/axios"
import { Link } from "react-router-dom"

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
    const { data: recommendedUsers = [], isLoading: loadingRecommendedUsers } = useQuery({
        queryKey: ["recommendedUsers"],
        queryFn: () => axiosExpress.get(`users/recommended/${currentUser.id}`)
    })
    const { mutate: follow, isLoading: loadingFollow } = useMutation({
        mutationFn: async (userId) => {
            const { data } = await axiosExpress.post('/follow', {
                followerId: currentUser.id,
                followedId: userId
            })
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["followedUsers"]);
            queryClient.invalidateQueries(["recommendedUsers"]);
        },

    });
    if (loadingFollow) {
        return <p>following</p>
    }
    if (loadingUsers || loadingnewUsers || loadingRecommendedUsers) {
        return (
            <p>loading users</p>
        )
    }
    return (
        <>
            <ScrollArea className="flex flex-col w-[20%] h-screen content-between pl-3">
                <div className="mb-10">
                    <p>suggested for you</p>
                    {
                        recommendedUsers ? recommendedUsers.data.map((user) => {
                            return (
                                <div className="flex flex-row gap-3 items-center m-3 justify-between">
                                    <div className="flex gap-2">
                                        <img src="user.profile_picture" className="w-7 h-7 border-2 border-gray-200 rounded-full" />
                                        <span>{user.username}</span>
                                    </div>
                                    <Button className="bg-blue-500 h-6" onClick={() => follow(user.user_id)}>Follow</Button>
                                </div>
                            )
                        })
                            : <p>no recommended user...</p>
                    }
                </div>
                <div className="my-10">
                    <p>latest activities</p>
                    {
                        followedUsers ? followedUsers.data.map((user) => {
                            return (
                                <div className="flex flex-row items-center m-3 justify-between">
                                    <Link to={`/profile/${user.id}`}>
                                        <div className="flex gap-2">
                                            <img className="rounded-full w-7 h-7 border-2 border-gray-200" src={`/uploads/${user.profile_picture}`} alt="" />
                                            <span>{user.username}</span>
                                        </div>
                                    </Link>
                                    <Link to={`/chat/${user.id}`}>
                                        <Button variant="outline">
                                            chat
                                        </Button>
                                    </Link>
                                </div>
                            )
                        }) : <p>no friends</p>
                    }
                </div>
                <div className="my-10">
                    <p>online friends</p>
                    {Array.from({ length: 5 }).map((_, i) => (
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