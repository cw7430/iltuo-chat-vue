import { eq } from "drizzle-orm";

import { db } from "../libs/db";
import { users, nativeAuths } from "../entities/auths";

export const findSignInInfoByUserId = async (userId: string) => {
  const [user] = await db
    .select({
      password: nativeAuths.password,
      authority: users.authority,
    })
    .from(users)
    .innerJoin(nativeAuths, eq(users.userIdx, nativeAuths.userIdx))
    .where(eq(users.userId, userId))
    .limit(1);

  return user;
};
