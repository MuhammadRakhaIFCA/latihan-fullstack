import { FaUserFriends } from "react-icons/fa"

export const Rightbar = () => {
    return (
        <>
            <div className="flex flex-col w-[20%] h-screen overflow-auto content-between">
                <div className="my-10">
                    <p>suggested for you</p>
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


            </div>
        </>
    )
}