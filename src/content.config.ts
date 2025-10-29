import { defineCollection, z } from 'astro:content';

// Define collections to prevent auto-generation warnings
const wealthCode = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
});

const legal = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
    lastUpdated: z.date().optional(),
  }),
});

export const collections = {
  'wealth-code': wealthCode,
  legal: legal,
};
