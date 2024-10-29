import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AiOutlineLike } from "react-icons/ai";
import { LiaCommentDots } from "react-icons/lia";
import { CiShare2 } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { axiosExpress } from "@/lib/axios";
import { AuthContext } from "@/context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Profile from "@/assets/img.png"
import profile_picture from "@/assets/day-tree.jpg"

export const Post = ({ id, userId, description, profile_picture, username, index, postImage }) => {
    const { currentUser } = useContext(AuthContext);
    const [content, setContent] = useState("");
    const [openComments, setOpenComments] = useState({});
    const queryClient = useQueryClient();

    // Fetch comments for this post
    const { data: comments = [], isLoading: loadingComments } = useQuery({
        queryKey: ["comments", id], // Unique query key per post
        queryFn: () => axiosExpress.get(`/comments/get/${id}`).then((res) => res.data),
    });

    // Mutation to add a new comment
    const { mutate: addComment, isLoading: addingComment } = useMutation({
        mutationFn: (newComment) => axiosExpress.post("/comments/add", newComment),
        onSuccess: () => {
            queryClient.invalidateQueries(["comments", id]); // Refresh comments
            setContent(""); // Clear input field
        },
    });

    // Toggle comments visibility per post
    const toggleComments = (postIndex) => {
        setOpenComments((prev) => ({
            ...prev,
            [postIndex]: !prev[postIndex],
        }));
    };

    // Handle adding a new comment
    const handleAddComment = () => {
        if (content.trim()) {
            addComment({ userId: currentUser.id, postId: id, content });
        }
    };

    return (
        <Card key={id} className="w-[90%] justify-self-center mb-10">
            <CardHeader className="p-5">
                <div className="flex justify-between">
                    <Link to={`/profile/${userId}`}>
                        <div className="flex items-center gap-3">
                            <img src={Profile} alt={Profile} className="rounded-full" />
                            <div className="flex flex-col">
                                <p className="text-md font-semibold">{username}</p>
                                <p className="text-sm">post time</p>
                            </div>
                        </div>
                    </Link>

                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <BsThreeDots className="w-full h-full" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {userId === currentUser.id ? (
                                <>
                                    <DropdownMenuItem>Edit post</DropdownMenuItem>
                                    <DropdownMenuItem>Delete post</DropdownMenuItem>
                                </>
                            ) : (
                                <>
                                    <DropdownMenuItem>Not interested</DropdownMenuItem>
                                    <DropdownMenuItem>Report</DropdownMenuItem>
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div>
                    <p className="text-justify">{description}</p>
                </div>
            </CardHeader>

            {postImage ?
                <CardContent className="flex flex-col aspect-square items-center justify-center">
                    <img src={`/uploads/${postImage}`} alt="Post" className="w-full h-full" />
                </CardContent>
                : null}


            <CardFooter>
                <div className="flex-col flex w-full">
                    <div className="flex gap-4 items-center">
                        <div className="items-center flex gap-1 cursor-pointer">
                            <AiOutlineLike className="w-7 h-7" />
                            <span className="text-md">Like</span>
                        </div>
                        <div
                            className="items-center flex gap-1 cursor-pointer"
                            onClick={() => toggleComments(index)}
                        >
                            <LiaCommentDots className="w-7 h-7" />
                            <span className="text-md">Comments</span>
                        </div>
                        <div className="items-center flex gap-1 cursor-pointer">
                            <CiShare2 className="w-7 h-7" />
                            <span className="text-md">Share</span>
                        </div>
                    </div>

                    {/* Comment Input Section */}
                    {openComments[index] && (
                        <>
                            <div className="grid grid-cols-[5%_75%_15%] mt-7 gap-2 items-center">
                                <img src={Profile} alt={Profile} className="rounded-full" />
                                <Input
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Write a comment..."
                                />
                                <Button
                                    onClick={handleAddComment}
                                    disabled={addingComment || !content.trim()}
                                >
                                    {addingComment ? "Posting..." : "Comment"}
                                </Button>
                            </div>

                            {/* Comments List */}
                            <div className="mt-7">
                                {loadingComments ? (
                                    <p>Loading comments...</p>
                                ) : comments.length > 0 ? (
                                    comments.map((comment) => (
                                        <div
                                            key={comment.id}
                                            className="grid grid-cols-[5%_75%_15%] mt-7 gap-2 items-center"
                                        >
                                            <Link to={`/profile/${comment.user_id}`}>
                                                <img src={Profile} alt="Commenter" className="rounded-full" />
                                            </Link>
                                            <div>
                                                <Link to={`/profile/${comment.user_id}`}>
                                                    <p className="font-bold text-start">
                                                        {comment.username}
                                                    </p>
                                                </Link>
                                                <p className="text-justify">{comment.content}</p>
                                            </div>
                                            <p className="place-self-center text-sm text-gray-500">
                                                Time posted
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No comments yet</p>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
};




