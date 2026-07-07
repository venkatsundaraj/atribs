"use client";

import { logoutHandler } from "@/server/actions/user-actions";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface LogoutProps {}

const Logout = ({}) => {
  const router = useRouter();
  return (
    <button
      className="hover:text-blue-500 cursor-pointer"
      onClick={async () => {
        const result = await logoutHandler();
        if (result.success) {
          router.push("/signup");
        }
      }}
    >
      Logout
    </button>
  );
};

export default Logout;
