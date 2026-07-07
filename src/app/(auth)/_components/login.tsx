"use client";

import { userValidation, userValidationType } from "@/lib/validation/user";
import { useUser } from "@/providers/user-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, FormEvent, useState } from "react";
import { useForm } from "react-hook-form";

interface LoginProps {}

const Login: FC<LoginProps> = ({}) => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<userValidationType>({
    resolver: zodResolver(userValidation),
  });

  const router = useRouter();

  const { login } = useUser();

  const loginHandler = async function (data: userValidationType) {
    await login(data);
    // const res = await fetch("http://localhost:3000/api/auth/login", {
    //   method: "POST",
    //   body: JSON.stringify(data),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // const body = await res.json();

    // if (body.email) {
    //   router.push("/dashboard");
    // }
  };
  return (
    <form
      onSubmit={handleSubmit(loginHandler)}
      className="flex flex-col items-center justify-center w-full gap-8 max-w-[740px] bg-green-950 rounded-md py-24"
    >
      <input
        // defaultValue={"venkat@gmail.com"}
        className="border min-w-[340px] rounded-md px-4 py-2"
        type="email"
        {...register("email")}
        placeholder="email"
      />
      <input
        // defaultValue={"venkat1234"}
        type="password"
        placeholder="password"
        className="border min-w-[340px] rounded-md px-4 py-2"
        {...register("password")}
      />
      <button className="bg-green-800 px-4 py-2 rounded-md" type="submit">
        Login
      </button>
      <p>
        new user{" "}
        <Link href={"/login"} className="underline hover:text-green-800">
          signup
        </Link>
      </p>
    </form>
  );
};

export default Login;
