import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { user } from './auth';
import {
  POST_CONTENT_MAX_LENGTH,
  VISIBILITY_VALUES,
} from '@/lib/constants/posts';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import type z from 'zod';
import { relations } from 'drizzle-orm';

export const visibilityEnum = pgEnum('visibility', VISIBILITY_VALUES);

export const postsTable = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  authorId: text('author_id').notNull(),
  visibility: visibilityEnum().notNull(),

  content: varchar('content', {
    length: POST_CONTENT_MAX_LENGTH,
  }).notNull(),

  createdAt: timestamp('created_at', {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});
export const postsRelations = relations(postsTable, ({ one }) => ({
  author: one(user, {
    fields: [postsTable.authorId],
    references: [user.id],
  }),
}));

export const insertPostSchema = createInsertSchema(postsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectPostSchema = createSelectSchema(postsTable);

export type InsertPostSchema = z.infer<typeof insertPostSchema>;
export type SelectPostSchema = z.infer<typeof selectPostSchema>;
export type SelectPostSchemaWithUser = z.infer<typeof selectPostSchema> & {
  author: typeof user.$inferSelect;
};
