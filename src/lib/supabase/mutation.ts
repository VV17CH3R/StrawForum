"use server";

import { dbServer } from ".";
import { db } from "../db";
import { likes, replies } from "../db/schema";

export const likePost = async ({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) => {
  console.log(postId , userId)
  await db.insert(likes).values({
    postId: postId,
    userId: userId
  }).catch((err)=>{
    console.error(err);
  });
};

export const unlikePost = async ({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) => {
  const res = await dbServer
    .from("likes")
    .delete()
    .eq("post_id", postId)
    .eq("user_id", userId);

  return res;
};

export const comment = async ({postId, userId, commentText}:{postId: string, userId: string, commentText: string}) => {
  
  if(commentText === "") return;

  await db.insert(replies)
  .values({
    text: commentText,
    userId,
    postId,
  })
}