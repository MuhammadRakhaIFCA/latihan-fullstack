import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import img from "@/assets/img.png"
import profilePic from "@/assets/map.png"
import tree from "@/assets/tree.jpg"

import { BsThreeDots } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { LiaCommentDots } from "react-icons/lia";
import { CiShare2 } from "react-icons/ci";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { addComment, getComment } from "@/services/service"



export const Post = (props) => {
    // State to track which comments are open (per post)
    const [openComments, setOpenComments] = useState({});
    const [comments, setComments] = useState([])

    // Toggle comment visibility for a specific post by index
    const toggleComments = (index) => {
        setOpenComments((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    useEffect(() => {
        const getComment = async (postId) => {
            try {
                const data = await axiosExpress.get("/comments/get", {
                    postId
                })
                return data.data
            } catch (error) {

            }
        }

        getComment(props.id)
    }, [])

    return (
        <Card key={props.id} className="w-[90%] justify-self-center mb-10">
            <CardHeader className="p-5">
                <div className="flex justify-between">
                    <Link to="/profile/1">
                        <div className="flex items-center justify-start gap-3">
                            <img src={profilePic} alt="" className="rounded-full" />
                            <div className="flex flex-col">
                                <p className="text-md font-semibold">{props.username}</p>
                                <p className="text-sm">post time</p>
                            </div>
                        </div>
                    </Link>
                    <div className="justify-self-end items-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <BsThreeDots className="w-full h-full" /></DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Not interested</DropdownMenuItem>
                                <DropdownMenuItem>report</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                </div>
                <div>
                    <p className="text-justify">{props.description}</p>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col aspect-square items-center justify-center">
                <img src={props.profile_picture} alt={tree} className="w-full h-full" />
            </CardContent>
            <CardFooter>
                <div className="flex-col flex w-full">

                    <div className="flex gap-4 items-center ">
                        <div className="items-center flex gap-1 cursor-pointer" >
                            <AiOutlineLike className="w-7 h-7" />
                            <span className="text-md">like</span>
                        </div>
                        <div className="items-center flex gap-1 cursor-pointer" onClick={() => toggleComments(props.index)} >
                            <LiaCommentDots className="w-7 h-7" />
                            <span className="text-md">comments</span>
                        </div>
                        <div className="items-center flex gap-1 cursor-pointer">
                            <CiShare2 className="w-7 h-7" />
                            <span className="text-md">share</span>
                        </div>

                    </div>
                    <div className="grid grid-cols-[5%_75%_15%] mt-7 justify-between">
                        <img src={profilePic} alt="" className="rounded-full" />
                        <Input></Input>
                        <Button onClick={() => addComment(props.userId, props.id, "content")}>comment</Button>
                    </div>
                    {openComments[props.index] && (
                        <div className="mt-7">
                            {comments.map((comment) => {
                                return (
                                    <div className="grid grid-cols-[5%_75%_15%] mt-7 justify-between">
                                        <Link to="/profile/{comment.user_id}">
                                            <img src={profilePic} alt="" className="rounded-full" />
                                        </Link>
                                        <div>
                                            <Link to="/profile/1">
                                                <p className="font-bold text-start">{comment.username}</p>
                                            </Link>
                                            <p className="text-justify">
                                                {comment.content}
                                            </p>
                                        </div>
                                        <p className="place-self-center">time posted</p>
                                    </div>
                                )
                            })
                            }
                        </div>
                    )}
                </div>
            </CardFooter>
        </Card>
    )
}