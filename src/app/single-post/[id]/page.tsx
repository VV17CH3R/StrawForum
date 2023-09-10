import CommentBody from "@/components/client-components/comment-body";
import PostEl from "@/components/client-components/post";
import LeftSidebar from "@/components/left-sidebar";
import RightSidebar from "@/components/right-sidebar";
import { db } from "@/lib/db";
import { getPosts } from "@/lib/supabase/queries";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { eq } from "drizzle-orm";
import { cookies, headers } from "next/headers";
import { replies } from "../../../lib/db/schema";

export const revalidate = 0;

const UserPost = async ({ params }: { params: { id: string } }) => {
  const dbClient = createServerComponentSupabaseClient({ cookies, headers });

  const { data: userData, error: userError } = await dbClient.auth.getUser();

  const userPost = await getPosts(
    userData.user?.id,
    params.id,
    false,
    1,
    undefined
  );

  const postComment = await db.query.replies.findMany({
    with: {
      profile: true,
    },
    where: eq(replies.postId, params.id),
  });

  console.log(postComment);

  return (
    <div className="w-full h-full flex justify-center items-center relative">
      <div className="h-full min-w-[70vw] flex relative">
        <LeftSidebar />

        <div className="min-h-full max-w-[600px] min-w-[480px] bg-blue-400/50  border-black border-l border-r flex flex-col">
          <>
            <h1 className="text-2xl text-center backdrop-blur bg-white-500/20 sticky top-0 p-5 font-bold cursor-default text-white/80">
              {`От ${userData.user?.user_metadata.full_name}`}
            </h1>
            {userPost ? (
              <PostEl
                hasLiked={Boolean(userPost[0].hasLiked)}
                likesCount={userPost[0].likes.length ?? 0}
                post={{
                  postDetails: userPost[0].post,
                  userProfile: userPost[0].profile,
                }}
                currentUserId={userData.user?.id}
              />
            ) : (
              <div> Произошла ошибка при загрузке поста </div>
            )}
            {postComment?.map((el) => {
              return (
                 <CommentBody 
                    key={el.id} 
                    fullName={el.profile.fullName}
                    text={el.text}
                    userProfileId={el.profile.id}
                />
                
              );
            })}
          </>
        </div>
        <RightSidebar />
      </div>
    </div>
  );
};

export default UserPost;
