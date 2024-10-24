import { FaUserFriends } from "react-icons/fa"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"

export const Rightbar = () => {
    return (
        <>
            <ScrollArea className="flex flex-col w-[20%] h-screen content-between pl-3">
                <div className="my-10">
                    <p>suggested for you</p>
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
                    <div className="flex flex-row gap-3 items-center my-3">
                        <FaUserFriends className="w-7 " />
                        <span>user name</span>
                        <Button className="bg-blue-500 h-6">Follow</Button>
                    </div>
                </div>
                <div className="my-10">
                    <p>latest activities</p>
                    <div className="flex flex-row gap-3 items-center my-3">
                        <FaUserFriends className="w-7 " />
                        <span>user name</span>
                    </div>
                    <div className="flex flex-row gap-3 items-center my-3">
                        <FaUserFriends className="w-7 " />
                        <span>user name</span>
                    </div>
                    <div className="flex flex-row gap-3 items-center my-3">
                        <FaUserFriends className="w-7 " />
                        <span>user name</span>
                    </div>
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