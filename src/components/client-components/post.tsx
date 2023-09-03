"use client";

import { Posts, Profile } from "@/lib/db/schema";
import dayjs from "dayjs";
import relativeTeme from "dayjs/plugin/relativeTime";
import { BsReply, BsShare, BsThreeDots } from "react-icons/bs";
import LikeButton from "./like-button";
import ReplyDialog from "./reply-dialog";

dayjs.extend(relativeTeme);

export type PostProps = {
  post: {
    userProfile: Profile;
    postDetails: Posts;
  };
  currentUserId?: string;
  likesCount: number;
  hasLiked: boolean;
};

const PostEl = ({ post, likesCount, hasLiked, currentUserId }: PostProps) => {
  return (
    <>
      <div
        key={post.postDetails.id}
        className="mt-3 border-t-[0.5px] mx-5 p-5 bg-slate-200/50 px-4 border-b-[0.5px] flex space-x-4"
      >
        <div className="">
          <div className="text-sm bg-slate-400 w-10 h-10 "></div>
        </div>
        <div className="w-full">
          <div className="flex items-center justify-between">
            <div className="flex space-x-4 items-center justify-start">
              <div className="text-lg">
                {post.userProfile.fullName ?? "Аноним"}
              </div>
            </div>

            <div>
              <BsThreeDots className="cursor-pointer" size={20} />
            </div>
          </div>
          <div className="flex text-sm text-slate-400 items-center justify-start">
            {dayjs(post.postDetails.createdAt).fromNow()}
          </div>
          <div className="text-sm mt-4">{post.postDetails.text}</div>
          <div className="w-full mt-4 h-[380px] rounded-xl bg-green-500/50">

          </div>
          <div className="flex space-x-5 mr-2 mt-4 justify-end flex-row">
            
            <ReplyDialog 
              post={post} currentUserId={currentUserId} likesCount={likesCount} hasLiked={hasLiked}
            />
            <div className="cursor-pointer transition duration-300 rounded-full p-2 hover:bg-white/20">
              <BsReply size={15} />
            </div>
            <LikeButton
              postId={post.postDetails.id}
              userId={currentUserId}
              likesCount={likesCount}
              isLiked={hasLiked}
            />
            <div className="cursor-pointer transition duration-300 rounded-full p-2 hover:bg-white/20">
              <BsShare size={15} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostEl;
