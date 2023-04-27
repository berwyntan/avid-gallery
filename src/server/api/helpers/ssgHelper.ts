import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "../root";
import { prisma } from "~/server/db";
import superjson from "superjson";

export const generateSSGHelper = () => createServerSideHelpers({
    router: appRouter,
    ctx: { prisma },
    transformer: superjson, // optional - adds superjson serialization
  });