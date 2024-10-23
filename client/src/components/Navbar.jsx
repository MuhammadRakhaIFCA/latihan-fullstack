import { IoHomeOutline } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa";
import { MdOutlineApps } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { Input } from "./ui/input";
import { RiAccountCircleLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiMail } from "react-icons/ci";

export const Navbar = () => {
    return (
        <>
            <div className="grid grid-cols-3">
                <div className="flex flex-row gap-5 p-3 items-center content-center">
                    <h1 className="font-bold text-2xl">lamasocial</h1>
                    <IoHomeOutline className="w-5 h-5" />
                    <FaRegMoon className="w-5 h-5" />
                    <MdOutlineApps className="w-5 h-5" />
                </div>
                <div className="flex flex-row gap-5 p-3 items-center content-center">
                    <IoIosSearch className="w-5 h-5" />
                    <Input className="w-full"></Input>
                </div>

                <div className="flex flex-row gap-5 p-3 items-center content-start">
                    <RiAccountCircleLine className="w-5 h-5" />
                    <CiMail className="w-5 h-5" />
                    <IoMdNotificationsOutline className="w-5 h-5" />
                </div>
            </div>

        </>
    )
}