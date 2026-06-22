import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    titleEn: z.string().optional(),
    date: z.coerce.date(),
    excerpt: z.string().optional(),
    excerptEn: z.string().optional(),
    coverImage: z.string().optional(),
  }),
});

const clinicalCases = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/clinical-cases' }),
  schema: z.object({
    title: z.string(),
    titleEn: z.string().optional(),
    service: z.enum(['implantology', 'aesthetic', 'periodontology', 'facial', 'aligners']),
    beforeImage: z.string().optional(),
    afterImage: z.string().optional(),
    description: z.string().optional(),
    descriptionEn: z.string().optional(),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    roleEn: z.string().optional(),
    photo: z.string().optional(),
    bio: z.string().optional(),
    bioEn: z.string().optional(),
    specializations: z.array(z.string()).optional(),
    specializationsEn: z.array(z.string()).optional(),
    order: z.number().default(1),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/testimonials' }),
  schema: z.object({
    author: z.string(),
    text: z.string(),
    textEn: z.string().optional(),
    rating: z.number().min(1).max(5).default(5),
  }),
});

export const collections = { posts, clinicalCases, team, testimonials };
