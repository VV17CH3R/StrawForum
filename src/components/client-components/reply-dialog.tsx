"use client";

import React, { useRef, useState, useTransition } from "react";
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
import { Input } from "../ui/input";
import { useSupabase } from "@/app/supabase-provider";
import { toast } from "sonner";
import { comment } from "@/lib/supabase/mutation";

type ReplyDialogProps = {
  post: {
    userProfile: Profile;
    postDetails: Posts;
  };
  currentUserId?: string;
  likesCount: number;
  hasLiked: boolean;
};

const ReplyDialog = ({
  post,
  currentUserId,
  likesCount,
  hasLiked,
}: ReplyDialogProps) => {

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  let [isCommentPending, startTransition] = useTransition();

  const [commentText, setCommentText] = useState<string>("");
  const {supabase} = useSupabase();

  return (
    <Dialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => {}}
          className="cursor-pointer transition duration-300 rounded-full p-2 hover:bg-white/20"
        >
          <LiaCommentDots size={15} />
        </button>
      </DialogTrigger>
      <DialogContent className="bg-blue-400/50 overflow-y-scroll max-h-screen">
        <div key={post.postDetails.id} className="px-4 flex space-x-4">
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
            <div className="flex text-sm text-white/50 items-center justify-start">
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
        <div className="border-t-[0.5px] pt-3">
          Комментарии 
          <span className="text-l  text-gray-500">  @{post.userProfile.fullName || "Аноним"} </span>
        </div>
        <div>
          <p className="text-l text-center w-full pb-5 text-white/50"> Нет комментариев </p>
        </div>
        <textarea
          className="placeholder:text-sm placeholder:text-gray-500
          w-full p-4 border outline-none bg-transparent min-h-full"
          placeholder="Введите текст комментария..."
          maxLength={155}
          name="commentText"
          value={commentText}
          onChange={e=>setCommentText(e.target.value)}
        />
        <button
          disabled={isCommentPending}
          onClick={()=>{
              supabase.auth.getUser()
              .then((res)=>{
                if(res.data && res.data.user) {
                  const user = res.data.user;
                  startTransition(() => {
                    comment({
                      commentText,
                      postId: post.postDetails.id,
                      userId: user.id
                    })
                    .then(()=> {
                      setIsDialogOpen(false);
                    })
                    .catch(()=>{
                      toast.error("Что-то пошло не так c базой данных");
                    });
                  });
                } else {
                  toast("Зарегестрируйтесь, что бы комментировать посты")
                }
              })
              .catch(() => {
                toast.error("Ошибка авторизации")
              })
          }}
          className="text-white  ml-[60%] bg-blue-500/75 hover:bg-blue-400/75
                      flex items-center justify-center text-sm hover:text-black
                     space-x-4 mt-2 rounded-3xl p-2 "
        >
          Отправить
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default ReplyDialog;
