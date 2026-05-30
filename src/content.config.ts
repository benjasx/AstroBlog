//src/content.config.ts
import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      description: z.string(),
      image: image(),

      //Relacion
      /* author: z.string(), */
      author: reference("author"),
      tags: z.array(z.string()),

      isDraft: z.boolean().default(false),
    }),
});

const author = defineCollection({
  loader: glob({
    base: "./src/content/author",
    pattern: "**/*.{json,yaml,yml}",
  }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      avatar: image(),
      twitter: z.string(),
      linkedIn: z.string(),
      github: z.string(),
      bio: z.string(),
      subtitle: z.string(),
    }),
});

export const collections = { blog, author };
