import { getPosts } from "@/lib/supabase/queries";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { GiStrawberry } from "react-icons/gi";
import BurgerDialog from "./client-components/nav-bar-burger-dialog";
import PostEl from "./client-components/post";
import ComposePost from "./server-components/compose-post";
import { likes, profiles, replies, posts } from "@/lib/db/schema";
import { db } from "@/lib/db";

const CentralPage = async () => {
  const dbClient = createServerComponentSupabaseClient({ cookies, headers });

  const { data: userData, error: userError } = await dbClient.auth.getUser();

  const response = await getPosts(
    userData.user?.id,
    undefined,
    true,
    undefined,
    undefined
  );

  return (
    <main className=" min-h-screen max-w-[600px] min-w-[480px] bg-blue-400/50  border-black border-l border-r flex flex-col">
      <h1 className="text-3xl lg:text-5xl justify-center flex text-center backdrop-blur bg-white-500/20 sticky top-0 p-5 font-bold cursor-default text-white/80">
        <div className="mr-auto lg:hidden">
          <BurgerDialog />
        </div>
        Форум о клубнике
        <div className="ml-auto lg:hidden">
          <GiStrawberry className="cursor-pointer" size={55} color="white" />
        </div>
      </h1>
      <ComposePost />
      <div className="flex flex-col ">
        {!response && (
          <div>Нет соединения с сервером, обратитесь в поддержку.</div>
        )}

        {response?.map(({ likes, profile, post, hasLiked }) => (
          <PostEl
            post={{
              postDetails: {
                ...post,
              },
              userProfile: {
                ...profile,
              },
            }}
            key={post.id}
            currentUserId={userData.user?.id}
            hasLiked={Boolean(hasLiked)}
            likesCount={likes.length}
          />
        ))}
      </div>
    </main>
  );
};

export default CentralPage;
