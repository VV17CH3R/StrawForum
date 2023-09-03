"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LiaCommentDots } from "react-icons/lia";
import { Posts, Profile } from "@/lib/db/schema";
import { BsReply, BsShare, BsThreeDots } from "react-icons/bs";
import dayjs from "dayjs";
import LikeButton from "./like-button";

type ReplyDialogProps = {
  post: {
    userProfile: Profile;
    postDetails: Posts;
  };
  currentUserId?: string;
  likesCount: number;
  hasLiked: boolean;
};

const ReplyDialog = ({ post, currentUserId, likesCount, hasLiked }: ReplyDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          onClick={() => {}}
          className="cursor-pointer transition duration-300 rounded-full p-2 hover:bg-white/20"
        >
          <LiaCommentDots size={15} />
        </button>
      </DialogTrigger>
      <DialogContent>
        <div
          key={post.postDetails.id}
          className=" bg-white px-4 flex space-x-4"
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
            </div>
            <div className="flex text-sm text-slate-400 items-center justify-start">
              {dayjs(post.postDetails.createdAt).fromNow()}
            </div>
            <div className="text-sm mt-4">{post.postDetails.text}</div>
            <div className="w-full mt-4 h-[380px] rounded-xl bg-green-500/50"></div>
            <div className="flex space-x-5 mr-2 mt-4 justify-end flex-row">
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
      </DialogContent>
    </Dialog>
  );
};

export default ReplyDialog;
