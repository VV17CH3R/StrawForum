import PostEl from "@/components/client-components/post";
import LeftSidebar from "@/components/left-sidebar";
import RightSidebar from "@/components/right-sidebar";
import { getPosts } from "@/lib/supabase/queries";
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from "next/headers";

export const revalidate = 0;

const UserPosts = async ({params}:{params: { id: string }}) => {

  const dbClient = createServerComponentSupabaseClient({ cookies, headers });

  const { data: userData, error: userError } = await dbClient.auth.getUser();
  
  const userPosts = await getPosts(userData.user?.id, undefined, true, 10, params.id);
    
  return (
    <div className="w-full h-full flex justify-center items-center relative">
      <div className="h-full min-w-[70vw] flex relative">
        <LeftSidebar />
        <div className="min-h-screen max-w-[600px] min-w-[480px] bg-blue-400/50  border-black border-l border-r flex flex-col">
          <h1 className="text-2xl text-center backdrop-blur bg-white-500/20 sticky top-0 p-5 font-bold cursor-default text-white/80">
            {`От ${userData.user?.user_metadata.full_name}`}
          </h1>
          {!userPosts && (
              <div>
                Нет соединения с сервером, обратитесь в поддержку.
              </div>
          )}

          {userPosts?.length == 0 && (
              <div>
                Пользователь еще не создавал посты.
              </div>
          )}

            {userPosts?.map(({
              likes,
              profile,
              post,
              hasLiked,
            }) => (
              <PostEl 
                post={{
                  postDetails: {
                    ...post
                  }, 
                  userProfile:{
                    ...profile
                  },
                }}
                key={post.id} 
                currentUserId={userData.user?.id}
                hasLiked={Boolean(hasLiked)}
                likesCount={likes.length}
              />
            ))}


          {/* {userPosts ? <PostEl 
            hasLiked={Boolean(singlePost[0].hasLiked)}
            likesCount={singlePost[0].likes.length ?? 0}
            post={{
              postDetails: singlePost[0].post,
              userProfile: singlePost[0].profile
            }}
            currentUserId={userData.user?.id}

          /> : 
          <div> Произошла ошибка при загрузке поста </div>} */}
        </div>
        <RightSidebar />
      </div>
    </div>
  );
};

export default UserPosts;
