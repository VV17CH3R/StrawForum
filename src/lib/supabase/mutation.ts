"use server";

import { randomUUID } from "crypto";
import { dbServer } from ".";

export const likePost = async ({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) => {
  const {data, error} = await dbServer
    .from("likes")
    .insert({
      id: randomUUID(),
      post_id: postId,
      user_id: userId
    });
  if(error) console.error(error.message)
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
