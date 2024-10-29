import { IoHomeOutline } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa";
import { MdOutlineApps } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { Input } from "./ui/input";
import { RiAccountCircleLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiMail } from "react-icons/ci";
import { Link } from "react-router-dom";
import profilePic from "@/assets/map.png"
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export const Navbar = () => {
    const { currentUser } = useContext(AuthContext)
    return (
        <>
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
                <div className="flex flex-row gap-2 p-3 items-center justify-start">
                    <IoIosSearch className="w-5 h-5" />
                    <Input className="w-[90%]"></Input>
                </div>

                <div className="flex flex-row gap-5 p-3 items-center justify-center">
                    <RiAccountCircleLine className="w-5 h-5" />
                    <CiMail className="w-5 h-5" />
                    <IoMdNotificationsOutline className="w-5 h-5" />
                    <Link to={`/profile/${currentUser.id}`}>
                        <div className="flex flex-row ml-3 gap-2 items-center">
                            <img src={profilePic} alt={profilePic} className="rounded-full" />
                            <span>{currentUser.username}</span>
                        </div>
                    </Link>
                </div>
            </div>

        </>
    )
}