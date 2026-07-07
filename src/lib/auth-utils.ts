import "server-only";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "./env";
import { cookies } from "next/headers";
import { db } from "@/server/db";
import { user, VehicleType } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";

export const generatePassword = async function (
  password: string,
): Promise<string> {
  const SALT_ROUNDS = 12;
  const generatePasswordValue = await bcrypt.hash(password, SALT_ROUNDS);

  return generatePasswordValue;
};

export const verifyPassword = async function (password: string, hash: string) {
  return await bcrypt.compare(password, hash);
};
export const createSignJWT = async function (email: string) {
  const token = await jwt.sign(email, env.AUTH_SECRET);
  return token;
};

export const verifyJWT = async function (token: string) {
  const email = await jwt.verify(token, env.AUTH_SECRET);
  return email;
};

export const useSession = async function () {
  const cookiesData = (await cookies()).get("auth")?.value;

  if (!cookiesData) {
    return { success: false, email: null };
  }

  const email = await verifyJWT(cookiesData);

  if (!email) {
    return { success: false, email: null };
  }

  return { success: true, email: email };
};

export const checkAdmin = async function (): Promise<{
  success: boolean;
  message: string;
}> {
  const auth = await useSession();
  const authEmail = String(auth.email);
  //check admin
  const adminUser = await db
    .select()
    .from(user)
    .where(and(eq(user.email, authEmail), eq(user.role, "admin")))
    .then((res) => res[0]);

  if (!adminUser || !adminUser.email) {
    return { success: false, message: "you are not admin" };
  }

  return { success: true, message: "you are an admin" };
};
