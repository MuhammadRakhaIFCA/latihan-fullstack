import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AuthContext } from "@/context/AuthContext";
import { axiosExpress } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { CiCamera, CiFaceSmile } from "react-icons/ci";
import { LuSendHorizonal } from "react-icons/lu";
import { Link, useParams } from "react-router-dom";

const ChatPage = () => {
    const { currentUser } = useContext(AuthContext)
    const params = useParams()
    const queryClient = useQueryClient();
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);


    const { data: sender, isLoading: loadingSender } = useQuery({
        queryKey: ["sender"],
        queryFn: () => axiosExpress.get(`/users/get/${currentUser.id}`).then((res) => res.data),
    });
    const { data: receiver, isLoading: loadingReceiver } = useQuery({
        queryKey: ["receiver"],
        queryFn: () => axiosExpress.get(`/users/get/${params.userId}`).then((res) => res.data),
    });

    const { data: chats = [], isLoading: loadingChat, isError: errorChat } = useQuery({
        //queryKey: ["chats"],
        queryKey: ["chats", sender?.id, receiver?.id],
        queryFn: () => axiosExpress.get(`/chats/get`, {
            params:
            {
                senderId: sender.id,
                receiverId: receiver.id
            }
        }
        ).then((res) => res.data),
        enabled: !!sender && !!receiver
    });
    const { mutate: addChat, isLoading: addingChat } = useMutation({
        mutationFn: async (formData) => {
            await axiosExpress.post("/chats/add", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["chats", currentUser.id]);
            setText("");
            setImage(null); // Reset file input
        },
    });
    const handleFileChange = (e) => {
        setImage(e.target.files[0]); // Store the selected file
    };

    const handleAddChat = async () => {
        const formData = new FormData();
        if (text.trim() || image) {

            formData.append("senderId", sender.id);
            formData.append("receiverId", receiver.id);
            formData.append("text", text);
            if (image) formData.append("image", image); // Append file if available

            addChat(formData); // Call mutation with form data
        }
    };

    useEffect(() => {
        if (params.userId) {
            queryClient.invalidateQueries(["receiver", params.userId]);
        }
    }, [params.userId, queryClient]);

    if (loadingSender) {
        return <p>loading sender...</p>
    }
    if (loadingReceiver) {
        return <p>loading receiver...</p>
    }



    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* {console.log(chats)} */}
            <div className="bg-blue-500 text-white py-4 px-6 flex items-center justify-between">
                <Link to={`/profile/${receiver.id}`}>
                    <div className="flex gap-2 items-center">
                        <Avatar>
                            <AvatarImage src={`/uploads/${receiver.profile_picture}`} alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <h1 className="text-lg font-semibold">{receiver.username}</h1>
                    </div>
                </Link>
                <Button variant="ghost" className="text-white">
                    <CiCamera className="h-6 w-6" />
                </Button>
            </div>


            <ScrollArea className="flex-1 px-4 py-6 space-y-4 mb-[68px] max-h-[50%]">
                {loadingChat ?
                    <p>loading chat...</p>
                    : <div className="flex flex-col space-y-3">
                        <div className="flex items-start gap-2">
                            <Avatar>
                                <AvatarImage src={`/uploads/${receiver.profile_picture}`} alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="bg-white p-3 rounded-xl shadow-md max-w-[75%]">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eos adipisci, voluptates ipsum aut officiis numquam laudantium quaerat beatae laboriosam. Voluptatibus aut consequatur sint repellendus quam iure necessitatibus, distinctio rerum!</p>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">

                            <div className="bg-blue-500 text-white p-3 rounded-xl shadow-md max-w-[75%]">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid numquam tenetur ducimus eius assumenda praesentium ratione iusto eveniet doloribus dolorum. Laboriosam doloremque consequatur blanditiis placeat eius tenetur amet accusamus sit!</p>
                            </div>
                            <Avatar>
                                <AvatarImage src={`/uploads/${sender.profile_picture}`} alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                        {
                            chats ?
                                chats.map((chat) => {
                                    return chat.sender_id == sender.id ?
                                        <div className="flex justify-end gap-2">

                                            <div className="bg-blue-500 text-white p-3 rounded-xl shadow-md max-w-[75%]">
                                                <p>{chat.content}</p>
                                            </div>
                                            <Avatar>
                                                <AvatarImage src={`/uploads/${sender.profile_picture}`} alt="@shadcn" />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                        </div>

                                        : <div className="flex items-start gap-2">
                                            <Avatar>
                                                <AvatarImage src={`/uploads/${receiver.profile_picture}`} alt="@shadcn" />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                            <div className="bg-white p-3 rounded-xl shadow-md max-w-[75%]">
                                                <p>{chat.content}</p>
                                            </div>
                                        </div>
                                })
                                : <p>no chat</p>
                        }
                    </div>
                }

            </ScrollArea>

            {/* Input Area */}
            <div className="fixed bottom-0 left-[20%] w-[60%] bg-gray-200 p-4 flex items-center space-x-3">
                <Input
                    className="cursor-pointer w-9 h-9"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <Input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="flex-1"
                    placeholder="Type a message..."
                />
                <Button variant="secondary" className="p-2"
                    onClick={handleAddChat}
                    disabled={addingChat || (!text.trim() && !image)}>
                    <LuSendHorizonal className="h-6 w-6" />
                </Button>
            </div>
        </div >
    );
};

export default ChatPage;
