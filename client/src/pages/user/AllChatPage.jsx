import defaultPic from "@/assets/default.jpg"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AuthContext } from "@/context/AuthContext";
import { axiosExpress } from "@/lib/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { useContext } from "react";
import { Link } from "react-router-dom";

const AllChatPage = () => {
    const { currentUser } = useContext(AuthContext)
    const queryClient = useQueryClient();

    const { data: userChatBox = [], isLoading: loadingChat } = useQuery({
        queryKey: ["userChatBox"],
        queryFn: () => axiosExpress.get(`chats/get/${currentUser.id}`).then((res) => res.data),
    });
    if (loadingChat) return <p>loading chat...</p>
    return (
        <div className="bg-gray-200 min-h-screen">
            {
                console.log(userChatBox)
            }
            {
                userChatBox ?
                    userChatBox.map((chat) => {
                        const chatDate = moment(chat.created_at).fromNow();
                        return (
                            <div className="grid grid-cols-[10%_75%_15%] bg-gray-200 items-center p-3 border-b-2 border-x-2 border-gray-300">
                                <Link to={`/profile/${chat.id}`} className=" w-full h-full">
                                    <img src={`/uploads/${chat.profile_picture}`} alt={defaultPic} className="relative flex h-[70px] w-[70px] overflow-hidden rounded-full" />
                                </Link>
                                <Link to={`/chat/${chat.id}`}>
                                    <div className=" justify-self-start pl-3">
                                        <p className="text-3xl font-bold">{chat.username}</p>
                                        <p className="text-xl justify-self-start text-gray-600">{chat.content}</p>
                                    </div>
                                </Link>
                                <div className="justify-center ">
                                    <p>{chatDate}</p>
                                    {
                                        chat.unread_message_count > 0 ?
                                            <p className="bg-green-500 rounded-full w-7 text-white justify-self-center mt-2">{chat.unread_message_count}</p>
                                            : null
                                    }

                                </div>
                            </div>
                        )
                    })
                    : null
            }

        </div>
    )
}

export default AllChatPage