import { userValidation } from "@/lib/validation/user";
import { db } from "@/server/db";
import { user } from "@/server/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import {
  createSignJWT,
  generatePassword,
  verifyPassword,
} from "@/lib/auth-utils";
import { cookies } from "next/headers";
import { env } from "@/lib/env";

export const POST = async function (req: NextRequest) {
  try {
    // validation
    const body = await req.json();

    const cookieStore = await cookies();
    const parsedBody = userValidation.safeParse(body);
    if (!parsedBody.success) {
      throw Error("body should have mail and passwork");
    }

    // if user exists
    const { email, password } = parsedBody.data;

    const [existingUser] = await db
      .select({ email: user.email, password: user.password })
      .from(user)
      .where(eq(user.email, email));

    if (!existingUser.email) {
      throw Error("you should signup before login");
    }

    // bycrypt
    const hashedPassword = existingUser.password;

    const verifyPasswordData = await verifyPassword(password, hashedPassword);

    console.log(verifyPasswordData, "verifyPasswordData");
    if (!verifyPasswordData) {
      throw Error("the password you entered is wrong");
    }

    // jsonwebtoken
    const token = await createSignJWT(email);
    console.log(token, "token");

    cookieStore.set("auth", token, {
      maxAge: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    //res
    return new Response(JSON.stringify(existingUser), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), { status: 400 });
  }
};
