import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const text = z.string().min(1).max(1500);
const tours = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/tours' }),
  schema: z.object({
    slug: z.enum(['ubud','uluwatu','nusa-penida']),
    order: z.number().int().min(1).max(3),
    name:text, name_ja:text, category:text, category_ja:text,
    intro:text, intro_ja:text, heading:text, heading_ja:text,
    description:text, description_ja:text,
    steps:z.array(z.tuple([text,text])).min(1).max(10),
    note:text, note_ja:text, pack:text, pack_ja:text,
  }),
});
export const collections = { tours };
