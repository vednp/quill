import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { protectedProcedure ,publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/src/db";
import { z } from "zod";
export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    console.log(user);
    if (!user.id || !user.email) throw new TRPCError({ code: "UNAUTHORIZED" });

    // check if the user is in the database
    const dbUser = await db.user.findFirst({
      where: {
        id: user.id,
      },
    });
    
    try {
      await db.user.create({
        data: {
          id: user.id,
          email: user.email,
        },
      });
      console.log("User created in db");
    } catch (error) {
      console.error("Error creating user in db:", error);
      // Handle the error appropriately
    }

    return { success: true };
  }),
 getUserFiles: protectedProcedure.query(async ({ ctx }) => {
    const { userId } = ctx

    return await db.file.findMany({
      where: {
        userId,
      },
    })
  }),
 deleteFile: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
  const { userId } = ctx

  const file = await db.file.findFirst({
    where: {
      id: input.id,
      userId,
    },
  })

  if (!file) throw new TRPCError({ code: 'NOT_FOUND' })

  await db.file.delete({
    where: {
      id: input.id,
    },
  })

  return file
 })
});
 
export type AppRouter = typeof appRouter;
