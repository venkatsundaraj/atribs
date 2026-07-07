import { userValidation } from "@/lib/validation/user";
import { db } from "@/server/db";
import { user } from "@/server/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { createSignJWT, generatePassword } from "@/lib/auth-utils";
import { cookies } from "next/headers";
import { env } from "@/lib/env";

export const POST = async function (req: NextRequest) {
  try {
    // validation
    const body = await req.json();

    const cookieStore = await cookies();
    const parsedBody = userValidation.safeParse(body);
    if (!parsedBody.success) {
      throw Error("body should have mail and password");
    }

    // if user exists
    const { email, password } = parsedBody.data;
    const existingUser = await db
      .select({ email: user.email })
      .from(user)
      .where(eq(user.email, email));

    console.log(existingUser, "exisiting user");
    if (existingUser.length) {
      throw Error("you have already logged in");
    }

    // bycrypt
    const generatedPassword = await generatePassword(password);
    console.log(generatedPassword, "generatedPassword");
    const id = crypto.randomUUID();

    const newUser = await db
      .insert(user)
      .values({ email, password: generatedPassword, role: "user", id })
      .returning()
      .then((res) => res[0]);

    console.log(newUser, "newUser");
    if (!newUser) {
      throw Error("something went wrong while updating");
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
    return new Response(JSON.stringify(newUser), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), { status: 400 });
  }
};
