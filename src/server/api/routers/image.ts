import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const imageRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.images.findMany({
      orderBy: {
        seq: "desc",
      },
    });
    // console.log(posts)
    return posts;
  }),
  findByTag: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ ctx, input }) => {
      const posts = await ctx.prisma.images.findMany({
        orderBy: {
          seq: "desc",
        },
      }); 
      return input.text;
    }),
});
