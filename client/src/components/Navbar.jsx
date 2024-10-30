import { IoHomeOutline } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa";
import { MdOutlineApps } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { Input } from "./ui/input";
import { RiAccountCircleLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiMail } from "react-icons/ci";
import { Link } from "react-router-dom";
import profilePic from "@/assets/default.jpg"
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { axiosExpress } from "@/lib/axios";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { ScrollArea } from "./ui/scroll-area";

export const Navbar = () => {
    const { currentUser } = useContext(AuthContext)
    const [showSearchBar, setShowSearchBar] = useState(false)
    const { data: browsingUser = null, isLoading: loadingUser } = useQuery({
        queryKey: ["browsingUser"],
        queryFn: () => axiosExpress.get(`/users/get/${currentUser.id}`).then((res) => res.data),
    });
    const { data: users = [], isLoading: loadingUsers } = useQuery({
        queryKey: ["users"],
        queryFn: () => axiosExpress.get(`/users/get`).then((res) => res.data),
    });



    if (loadingUser) return <p>loading user</p>
    return (
        <div className="relative z-50">
            <div className="grid grid-cols-[20%_60%_19%]">
                <div className="flex flex-row gap-5 p-3 items-center">
                    <Link to="/explore">
                        <h1 className="font-bold text-2xl">lamasocial</h1>
                    </Link>
                    <Link to="/home">
                        <IoHomeOutline className="w-5 h-5" />
                    </Link>
                    <FaRegMoon className="w-5 h-5" />
                    <MdOutlineApps className="w-5 h-5" />
                </div>
                <div className="flex flex-row gap-2 p-3 items-center justify-start relative">
                    <Command className="rounded-lg border shadow-md md:min-w-[450px] ">
                        <CommandInput placeholder="find users..."
                            onFocus={() => setShowSearchBar(true)}
                            onBlur={() => setTimeout(() => setShowSearchBar(false), 100)} />
                        {
                            showSearchBar ?
                                <div className="justify-center">
                                    <CommandList className="absolute top-12 left-1/2 transform -translate-x-1/2 w-[97%] bg-white border rounded-lg shadow-lg mt-2 max-h-[120px]">
                                        <CommandEmpty>No users found.</CommandEmpty>
                                        {
                                            users ?
                                                users.map((user) => {
                                                    return (
                                                        // <ScrollArea className="flex-1 overflow-auto">
                                                        <CommandItem>
                                                            <Link to={`/profile/${user.id}`} className="flex gap-2 items-center">
                                                                <img src={`/uploads/${user.profile_picture}`}
                                                                    alt=""
                                                                    className="rounded-full w-7 h-7" />
                                                                <span>{user.username}</span>
                                                            </Link>
                                                        </CommandItem>
                                                        // </ScrollArea>
                                                    )
                                                })
                                                : null
                                        }

                                    </CommandList>
                                </div>
                                : null
                        }

                    </Command>
                </div>

                <div className="flex flex-row gap-5 p-3 items-center justify-center">
                    <RiAccountCircleLine className="w-5 h-5" />
                    <CiMail className="w-5 h-5" />
                    <IoMdNotificationsOutline className="w-5 h-5" />
                    <Link to={`/profile/${currentUser.id}`}>
                        <div className="flex flex-row ml-3 gap-2 items-center">
                            <img src={`/uploads/${browsingUser.profile_picture}`} alt={profilePic} className="rounded-full w-7 h-7" />
                            <span>{browsingUser.username}</span>
                        </div>
                    </Link>
                </div>
            </div>

        </div>
    )
}