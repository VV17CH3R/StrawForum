"use client"

import { useRouter } from "next/navigation";
import React from "react";

type CommentBodyProps = {
  fullName: string;
  text: string;
  userProfileId: string;
};

const CommentBody = ({ userProfileId, fullName, text }: CommentBodyProps) => {

    const router = useRouter();

  return (
    <div
      className=" flex transition-all hover:bg-white/50 border-t-[0.5px] mx-5 p-5 bg-slate-200/50 px-4 border-b-[0.5px]"
    >
      <div className="">
        <div className="text-sm bg-slate-400 w-10 h-10 "></div>
      </div>
      <div>
        <div 
            className="text-lg cursor-pointer hover:text-bold hover:text-blue-500 ml-6"
            onClick={()=>{
                router.push(`/posts/${userProfileId}`);
              }}
        >
          {fullName}
        </div>
        <div className="ml-3 text-gray-700 text-sm">{text}</div>
      </div>
    </div>
  );
};

export default CommentBody;
