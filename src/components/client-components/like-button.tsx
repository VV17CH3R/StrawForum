"use client";

import { likePost, unlikePost } from "@/lib/supabase/mutation";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import React, { useState, useTransition } from "react";
import { AiOutlineHeart} from "react-icons/ai";
import { VscHeartFilled } from "react-icons/vsc";
import { toast } from "sonner";


type LikeButtonProps = {
  postId: string;
  userId: string;
  likesCount: number | null;
  isLiked: boolean;
};

const LikeButton = ({ postId, userId, likesCount, isLiked }: LikeButtonProps) => {
  
  let [isLikePending, startTransition] = useTransition();

  const [UILiked, setUILiked] = useState(isLiked);
  const [UICount, setUICount] = useState(likesCount);

  return (
      <button
        disabled={isLikePending}
        onClick={() => {
          if (userId) {
            startTransition(() => {
              if(isLiked) {
                unlikePost({
                  postId,
                  userId
                });
                setUILiked(false);
                if(likesCount){ 
                  setUICount(likesCount -1)
                } else { setUICount(0) };
                
              } else {
                likePost({
                  postId,
                  userId
                });
                setUILiked(true);
                if(likesCount || likesCount === 0){ 
                  setUICount(likesCount +1); 
                }
              }
            }
            );
          } else {
            toast.error(
              "Только зарегестрированные пользователи могут оценивать посты"
            );
          }
        }}
        className="cursor-pointer items-center flex space-x-2 justify-around transition duration-300 rounded-full p-2 hover:bg-white/20"
      >
        {UILiked  ? <VscHeartFilled color="red" size={15}/> : <AiOutlineHeart size={15}/>}
        <span className="ml-1 text-sm">{UICount}</span>
      </button>

  );
};

export default LikeButton;
