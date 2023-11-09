// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';

// 2. Define a `type` and `schema` for each collection
const achievementCollection = defineCollection({
	type: 'data', // v2.5.0 and later
	schema: z.array(z.object({
		number: z.number(),
		title: z.string(),
	}))
});

const projectCollection = defineCollection({
	type: 'data',
	schema: z.array(z.object({
		title: z.string(),
		url: z.string()
	}))
})

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
	'achievement': achievementCollection,
	'project': projectCollection
};
