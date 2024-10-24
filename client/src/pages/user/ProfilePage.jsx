
import profilePic from "@/assets/map.png"
import dayTree from "@/assets/day-tree.jpg"

import { useState } from "react"
import { Post } from "@/components/Post"
import { FaFacebook, FaInstagram, FaLinkedin, FaPinterest, FaTwitter } from "react-icons/fa"
import { FaLocationDot } from "react-icons/fa6";
import { IoGlobeOutline } from "react-icons/io5"
import { Button } from "@/components/ui/button"


const ProfilePage = () => {
    return (
        <div className="w-full overflow-x-hidden justify-center grid">
            <div className="relative mb-5">
                <img src={dayTree} alt="" className="w-full" />
                <img
                    src={profilePic}
                    alt=""
                    className="rounded-full h-[30%] absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-white "
                />
            </div>
            <div className="w-[90%] border justify-self-center">
                <div className="mt-16">
                    <p>User name</p>
                </div>
                <div className="grid grid-cols-3 justify-between items-center p-5">
                    <div className="flex justify-start gap-2">
                        <FaFacebook className="w-6 h-6" />
                        <FaInstagram className="w-6 h-6" />
                        <FaTwitter className="w-6 h-6" />
                        <FaLinkedin className="w-6 h-6" />
                        <FaPinterest className="w-6 h-6" />
                    </div>
                    <div className="flex justify-between">
                        <FaLocationDot className="w-6 h-6" />
                        <span>location</span>
                        <IoGlobeOutline className="w-6 h-6" />
                        <span>website</span>
                    </div>
                    <div>
                        <p>Following : 0</p>
                        <p>Follower : 0</p>
                    </div>
                </div>
                <div className="my-5">
                    <Button variants="alert">
                        Follow
                    </Button>

                </div>
            </div>
            <div className="my-10 grid justify-items-stretch">
                {Array.from({ length: 5 }).map((_, index) => (
                    <Post
                        index={index}
                    />
                ))}
            </div>
        </div>
    )
}

export default ProfilePage