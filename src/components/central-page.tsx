import { getPosts } from '@/lib/supabase/queries';
import PostEl from './client-components/post';
import ComposePost from './server-components/compose-post';
import { cookies, headers } from "next/headers";
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';

const CentralPage = async () => {

  const dbClient = createServerComponentSupabaseClient({ cookies, headers });

  const { data: userData, error: userError } = await dbClient.auth.getUser();

  const response = await getPosts(userData.user?.id);

  return (
    <main className="min-h-screen max-w-[600px] min-w-[480px] bg-blue-400/50  border-black border-l border-r flex flex-col">
          <h1 className="text-5xl text-center backdrop-blur bg-white-500/20 sticky top-0 p-5 font-bold cursor-default text-white/80">
            Форум о клубнике
          </h1>
          <ComposePost />
          {/* <div className="flex flex-col ">
            {response?.error && (
              <div>
                Нет соединения с сервером, обратитесь в поддержку.
              </div>
            )}
            {response?.data && response.data.map((post: any) => (
              <PostEl post={post} key={post.id} />
            ))}
          </div> */}
        </main>
  )
}

export default CentralPage
