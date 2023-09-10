"use server";

import { and, desc, eq, exists } from "drizzle-orm";
import { db } from "../db";
import { Like, likes, Posts, posts, Profile, profiles } from "../db/schema";
import { Database } from "../supabase.types";
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from "next/headers";

export type PostType = Database["public"]["Tables"]["posts"]["Row"] & {
  profiles: Pick<
    Database["public"]["Tables"]["profiles"]["Row"],
    "full_name" | "username"
  >;
}

export const getPosts = async (
  currentUserID?:string, 
  getSinglePostId?:string, 
  orderBy?: boolean, 
  limit?: number, 
  getUserPostsById?: string
  ) => {
  
  try {
      let query = db
      .select({
        posts,
        likes,
        profiles,
        ...(currentUserID ? {hasLiked: exists(
          db
            .select()
            .from(likes)
            .where(
              and(
                eq(likes.postId, posts.id),
                eq(likes.userId, currentUserID)
              )
            )
        )} : {}),
      })
      .from(posts)
      .leftJoin(likes, eq(posts.id, likes.postId))
      .innerJoin(profiles, eq(posts.profileId, profiles.id))

      if(orderBy){
        query = query.orderBy(desc(posts.createdAt));
      }
      
      if(limit){
        query = query.limit(limit);
      }

      if(getUserPostsById){
        query = query.where(eq(posts.profileId,  getUserPostsById));
      }

      if(getSinglePostId) {
        query = query.where(eq(posts.id, getSinglePostId));
      }

      const rows = await query;

      if (rows) {
        const result = rows.reduce<
          Record<
          string,
          {post: Posts; likes: Like[]; profile: Profile; hasLiked: boolean}
          >
        >((acc, row)=>{
          const post = row.posts;
          const like = row.likes;
          const profile = row.profiles;
          const hasLiked = row.hasLiked;
          
          if(!acc[post.id]) {
            acc[post.id] = {post, likes: [], profile, hasLiked};
          }

          if(like) {
            acc[post.id].likes.push(like);
          }

          return acc;
        }, {});

        const data = Object.values(result);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };
