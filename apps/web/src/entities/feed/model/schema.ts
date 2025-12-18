import { z } from 'zod';

export const FeedSchema = z.object({
    id: z.string().uuid(),
    url: z.string().url(),
    title: z.string(),
    description: z.string().optional(),
    siteUrl: z.string().url().optional(),
    iconUrl: z.string().url().optional(),
    categoryId: z.string().optional(),
    lastFetched: z.date().optional(),
    errorCount: z.number().default(0),
    createdAt: z.date().default(() => new Date()),
});

export const ArticleSchema = z.object({
    id: z.string(), // GUID or Hash of URL
    feedId: z.string(),
    title: z.string(),
    link: z.string().url(),
    content: z.string().optional(),
    snippet: z.string().optional(),
    author: z.string().optional(),
    publishedAt: z.date(),
    isRead: z.boolean().default(false),
    isSaved: z.boolean().default(false),
    fetchedAt: z.date().default(() => new Date()),
});

export const CategorySchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    order: z.number().default(0),
});

export type Feed = z.infer<typeof FeedSchema>;
export type Article = z.infer<typeof ArticleSchema>;
export type Category = z.infer<typeof CategorySchema>;
