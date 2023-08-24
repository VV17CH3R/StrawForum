"use server";

import { desc, eq } from "drizzle-orm";
import { db } from "../db";
import { likes, posts, profiles } from "../db/schema";
import { Database } from "../supabase.types";

export type PostType = Database["public"]["Tables"]["posts"]["Row"] & {
  profiles: Pick<
    Database["public"]["Tables"]["profiles"]["Row"],
    "full_name" | "username"
  >;
}

// const queryWithCurrentUserId = `
// select
// posts.*,
// profiles.username as author_username,
// profiles.full_name AS author_full_name,
// count(likes.id) as likes_count,
// exists (
//   select
//     1
//   from
//     likes
//   where
//     likes.post_id = posts.id
//     and likes.user_id = $1
// ) as user_has_liked
//   from
//     posts
//     left join likes on posts.id = likes.post_id
//     join profiles on posts.profile_id = profiles.id
//   group by
//     posts.id, profiles.username, profiles.full_name
//   order by
//     posts.created_at desc;
// `;

// const queryWithoutCurrentUserId = `
// select
// posts.*,
// profiles.username,
// profiles.full_name,
// count(likes.id) as likes_count
// from
//   posts
//   left join likes on posts.id = likes.post_id
// group by
//   posts.id
// order by
//   posts.created_at desc;
// `;

export const getPosts = async (currentUserID?:string) => {


    try {
      // const result = await db.query.posts.findMany({
      //   with:{
      //     profile:{
      //       columns:{
      //         username: true,
      //         fullName: true,
      //       }
      //     }
      //   }
      // });
      const result = await db
      .select().from(posts)
      .leftJoin(likes, eq(posts.id, likes.postId))
      .innerJoin(profiles, eq(posts.profileId, profiles.id))
      .orderBy(desc(posts.createdAt))
      .limit(1)

      console.log(result)
    } catch (error) {
      return {error: "Что-то пошло не так. Ошибка запроса."}
    }
};

// export const getLikesCount = async (postId: string) => {
//   const res = await 
//   dbServer.from("likes")
//     .select(`id`, {count: "exact"})
//     .eq("post_id", postId);
    
//   return res;
// };

// export const isLikedbyUser = async ({postId, userId}:{postId:string, userId:string}) => {
//   const res = await 
//   dbServer.from("likes")
//     .select(`id`)
//     .eq("post_id", postId)
//     .eq("user_id", userId)
//     .single();

//     if(!res.data?.id) return false;

//   return Boolean(res);
// };

