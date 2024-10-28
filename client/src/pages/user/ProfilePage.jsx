
import profilePic from "@/assets/map.png"
import dayTree from "@/assets/day-tree.jpg"

import { useContext, useEffect, useState } from "react"
import { Post } from "@/components/Post"
import { FaFacebook, FaInstagram, FaLinkedin, FaPinterest, FaTwitter } from "react-icons/fa"
import { FaLocationDot } from "react-icons/fa6";
import { IoGlobeOutline } from "react-icons/io5"
import { Button } from "@/components/ui/button"
import { axiosExpress } from "@/lib/axios"
import SignedInPage from "@/guard/SignedInPage"
import { Navigate, redirect } from "react-router-dom"
import { AuthContext } from "@/context/AuthContext"
import { getMyPost } from "@/services/service"


const ProfilePage = () => {
    const { currentUser } = useContext(AuthContext)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const getMyPost = async () => {
            try {
                const data = await axiosExpress.get(`/posts/my/${currentUser.id}`)
                setPosts(data.data)
            } catch (error) {

            }
        }

        getMyPost()

    }, [])
    const handleLogout = async () => {
        try {
            await axiosExpress.post("/users/logout")
            localStorage.clear("user")
            return <Navigate to="/" />

        } catch (error) {

        }
    }
    return (
        <SignedInPage>
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
                            <p>Following : {currentUser.following_count}</p>
                            <p>Follower : {currentUser.follower_count}</p>
                        </div>
                    </div>
                    <div className="my-5">
                        {!currentUser.id ?
                            <Button variants="danger">
                                Follow
                            </Button> :
                            <>
                                <Button variants="alert" onClick={() => handleLogout()}>
                                    Logout
                                </Button>
                                <Button variants="alert" onClick={() => console.log(posts)}>
                                    Add Post
                                </Button>
                            </>
                        }


                    </div>
                </div>
                <div className="my-10 grid justify-items-stretch">
                    {
                        posts.map((post) => {
                            return (
                                <Post
                                    key={post.id}
                                    id={post.id}
                                    userId={post.userId}
                                    description={post.description}
                                    profile_picture={currentUser.profile_picture}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </SignedInPage>
    )
}

export default ProfilePage