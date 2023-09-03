import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";
import { cookies, headers } from "next/headers";
import ComposePostForm from "../client-components/compose-post-form";
import { db } from "../../lib/db/index";
import { posts } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

const ComposePost = async () => {

    async function addPost(formData: FormData) {
        "use server";

        const dbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const dbSecretKey = process.env.SUPABASE_SECRET_KEY;

        const postBody:any = formData.get("postBody");

        if (!postBody) return;

        const dbSb = createServerComponentSupabaseClient({
            cookies,
            headers
        });
        
        if(!dbUrl || !dbSecretKey) return {error:{message:"Неверные данные для базы данных"}};

        const dbServer = new SupabaseClient(dbUrl, dbSecretKey);

        const { data: userData, error: userError } = await dbSb.auth.getUser();

        if(userError) return;

        let err = "";

        const res =  await db.insert(posts).values({
            profileId: userData.user.id,
            text: postBody.toString(),
            id: randomUUID()
        }).returning().catch(()=>{
            err = "Не удалось разместить пост" 
        })

        console.log(res);

        revalidatePath("/");

        return { res, error:err };
    }

  return (
    <ComposePostForm
        serverAction={addPost}
    />
  );
};

export default ComposePost;
