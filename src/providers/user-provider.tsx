"use client";

import { useLogin, useRegister } from "@/hooks/use-user";
import { useAddVehicle, useUpdateVehicle } from "@/hooks/use-vehicle";
import { userValidationType } from "@/lib/validation/user";
import { vehicleValidationType } from "@/lib/validation/vehicle";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useMemo } from "react";

type UserContextType = {
  login: (data: userValidationType) => Promise<void>;
  register: (data: userValidationType) => Promise<void>;
};
const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider = function ({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { mutateAsync: loginHandler } = useLogin();
  const { mutateAsync: registerHandler } = useRegister();

  const login = useCallback(async function (data: userValidationType) {
    const res = await loginHandler(data);

    if (res.email) {
      return router.push("/dashboard");
    }
  }, []);

  const register = useCallback(async function (data: userValidationType) {
    try {
      const res = await registerHandler(data);

      if (res.email) {
        return router.push("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const value = useMemo(() => ({ login, register }), [login, register]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = function () {
  const ctx = useContext(UserContext);

  if (!ctx) {
    throw new Error("the component should be wrapped");
  }

  return ctx;
};
