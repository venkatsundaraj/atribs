"use server";

import { cookies } from "next/headers";

export const logoutHandler = async function (): Promise<{ success: boolean }> {
  const cookiesData = (await cookies()).delete("auth");

  return { success: true };
};
