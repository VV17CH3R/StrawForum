import { InferModel, relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  primaryKey,
  uuid,
  AnyPgColumn,
  uniqueIndex,
  boolean,
  alias,
} from "drizzle-orm/pg-core";

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  username: text("username").notNull(),
  fullName: text("full_name"),
  nickname: text("nickname")
});

export type Profile = InferModel<typeof profiles>;

export const profilesRelations = relations(profiles, ({ many }) => ({
  posts: many(posts),
  likes: many(likes),
  bookmarks: many(bookmarks),
  replies: many(replies),
}));

export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  text: text("text").notNull(),
  profileId: uuid("profile_id")
    .notNull()
    .references(() => profiles.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  isReply: boolean("is_reply").notNull().default(false),
  replyId: uuid("reply_id").references((): AnyPgColumn => posts.id),
});

export type Posts = InferModel<typeof posts>;

export const postsReplies = alias(posts, "tweets_replies");

export const postsRelations = relations(posts, ({ one }) => ({
  profile: one(profiles, {
    fields: [posts.profileId],
    references: [profiles.id],
  }),
  post: one(posts, {
    fields: [posts.replyId],
    references: [posts.id],
  }),
}));

export const hashtags = pgTable("hashtags", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
});

export const postsHashtag = pgTable(
  "post_hashtag",
  {
    postId: uuid("post_id")
      .notNull()
      .references(() => posts.id),
    hashtagId: uuid("hashtag_id")
      .notNull()
      .references(() => hashtags.id),
  },
  (post_hashtag) => ({
    postHashtagPrimaryKey: primaryKey(
      post_hashtag.postId,
      post_hashtag.hashtagId
    ),
  })
);

export const replies = pgTable("replies", {
  id: uuid("id").primaryKey().defaultRandom(),
  text: text("text").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => profiles.id),
  postId: uuid("post_id").references(() => posts.id),
  replyId: uuid("reply_id").references((): AnyPgColumn => replies.id), // self reference
});

export const repliesRelations = relations(replies, ({ one }) => ({
  profile: one(profiles, {
    fields: [replies.userId],
    references: [profiles.id],
  }),
}));

export const likes = pgTable(
  "likes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => profiles.id),
    postId: uuid("post_id")
      .notNull()
      .references(() => posts.id),
    created_at: timestamp("created_at").defaultNow().notNull(),
  },
  (likes) => ({
    uniqueLikeIndex: uniqueIndex("likes__user_id_post_id__idx").on(
      likes.userId,
      likes.postId
    ),
  })
);

export type Like = InferModel<typeof likes>;

export const likesRelations = relations(likes, ({ one }) => ({
  profile: one(profiles, {
    fields: [likes.userId],
    references: [profiles.id],
  }),
}));

export const bookmarks = pgTable(
  "bookmarks",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .references(() => profiles.id)
      .notNull(),
    postId: uuid("post_id")
      .references(() => posts.id)
      .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (bookmarks) => ({
    uniqueBookmarkIndex: uniqueIndex("bookmarks__user_id_post_id__idx").on(
      bookmarks.userId,
      bookmarks.postId
    ),
  })
);

export const bookmarksRelations = relations(bookmarks, ({ one }) => ({
  profile: one(profiles, {
    fields: [bookmarks.userId],
    references: [profiles.id],
  }),
}));
