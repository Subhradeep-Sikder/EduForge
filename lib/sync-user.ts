import { currentUser } from "@clerk/nextjs/server";
import prisma from "./prisma";

export async function syncCurrentUser() {
  try {
    // Grab user info from Clerk
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return null;
    }

    const email = clerkUser.emailAddresses[0]?.emailAddress;

    if (!email) {
      throw new Error("User email not found");
    }

    // See if they're already in the db
    let dbUser = await prisma.user.findUnique({
      where: { clerkUserId: clerkUser.id },
    });

    const fullName = `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim();

    if (dbUser) {
      // Already exists, just update their info (matched to your schema)
      dbUser = await prisma.user.update({
        where: { id: dbUser.id },
        data: {
          email,
          name: fullName || null,
        },
      });
    } else {
      // New user, gotta add them to db (matched to your schema)
      dbUser = await prisma.user.create({
        data: {
          clerkUserId: clerkUser.id,
          email,
          name: fullName || null,
        },
      });
      console.log(`New user created: ${email}`);
    }
    return dbUser;
  } catch (error) {
    console.error("Error syncing user from Clerk:", error);
    throw error;
  }
}