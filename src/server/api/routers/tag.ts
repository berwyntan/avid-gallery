import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const tagRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const tags = await ctx.prisma.tags.findMany();
    // console.log(posts)
    return tags;
  }),
});
