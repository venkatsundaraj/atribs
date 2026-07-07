import { env } from "@/lib/env";
import { userValidationType } from "@/lib/validation/user";
import { UserType } from "@/server/db/schema";
import { useMutation } from "@tanstack/react-query";

export const useLogin = function () {
  return useMutation({
    mutationFn: async function (data: userValidationType) {
      const res = await fetch(`${env.NEXT_PUBLIC_URL}/api/auth/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const body = (await res.json()) as { email: string; password: string };

      return body;
    },
    mutationKey: ["login-user"] as const,
  });
};

export const useRegister = function () {
  return useMutation({
    mutationFn: async function (data: userValidationType) {
      const res = await fetch(`${env.NEXT_PUBLIC_URL}/api/auth/signup`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const body = (await res.json()) as UserType;

      return body;
    },
    mutationKey: ["login-user"] as const,
  });
};
