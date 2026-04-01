import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    category: z.enum([
      'home-automation',
      'research',
      'development',
      'business-finance',
      'lifestyle-wellness',
      'creative',
      'experimental',
    ]),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    draft: z.boolean().default(false),
    storyOfTheDay: z.boolean().default(false),
  }),
});

export const collections = { posts, news };
