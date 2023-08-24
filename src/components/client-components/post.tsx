"use server"

import { dbServer } from '@/lib/supabase';
import { Database } from '@/lib/supabase.types';
// import { getLikesCount, isLikedbyUser } from '@/lib/supabase/queries';
import dayjs from "dayjs";
import relativeTeme from "dayjs/plugin/relativeTime";
import { BsReply, BsShare, BsThreeDots } from "react-icons/bs";
import { LiaCommentDots } from "react-icons/lia";
import LikeButton from './like-button';

dayjs.extend(relativeTeme);

export type PostProps = {
    post: any
};

const PostEl = async ({post}:PostProps) => {

  // const getPostLikesCount = await getLikesCount(post.id);
  // const isUSerAlrdLiked = await isLikedbyUser({ postId: post.id, userId: post.profiles.id});

  return (
    <div
                key={post.id}
                className="mt-3 border-t-[0.5px] mx-5 p-5 bg-slate-200/50 px-4 border-b-[0.5px] flex space-x-4"
              >
                <div className="">
                  <div className="text-sm bg-slate-400 w-10 h-10 "></div>
                </div>
                <div className='w-full'>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-4 items-center justify-start">
                      <div className="text-lg">{post.author_full_name ?? "Аноним"}</div>
                      <div className="font-bold text-xs">@{post.author_username}</div>
                    </div>
                    
                    <div><BsThreeDots className="cursor-pointer" size={20}/></div>
                  </div>
                  <div className="flex text-sm text-slate-400 items-center justify-start">
                      {dayjs(post.created_at).fromNow()}
                    </div>
                  <div className="text-sm mt-4">
                    {post.text}
                  </div>
                  <div className="w-full mt-4 h-[380px] rounded-xl bg-green-500/50"></div>
                  <div className="flex space-x-5 mr-2 mt-4 justify-end flex-row">
                    <div className="cursor-pointer transition duration-300 rounded-full p-2 hover:bg-white/20">
                      <LiaCommentDots size={15} />
                    </div>
                    <div className="cursor-pointer transition duration-300 rounded-full p-2 hover:bg-white/20">
                      <BsReply size={15} />
                    </div>
                    <LikeButton 
                      postId={post.id} 
                      userId={post.id}
                      likesCount={post.likes_count}
                      isLiked={post.user_has_liked}
                    />
                    <div className="cursor-pointer transition duration-300 rounded-full p-2 hover:bg-white/20">
                      <BsShare size={15} />
                    </div>
                  </div>
                </div>
              </div>
  )
}

export default PostEl
