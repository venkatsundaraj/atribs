"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, FormEvent, useState } from "react";

interface SignupProps {}

const Signup: FC<SignupProps> = ({}) => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const router = useRouter();

  const signUpHandler = async function (e: FormEvent) {
    e.preventDefault();
    console.log(email, password);
    if (!email?.length || !password?.length) return;
    const res = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const body = await res.json();

    if (body.email) {
      router.push("/dashboard");
    }
  };
  return (
    <form
      onSubmit={signUpHandler}
      className="flex flex-col items-center justify-center w-full gap-8 max-w-[740px] bg-green-950 rounded-md py-24"
    >
      <input
        // defaultValue={"venkat@gmail.com"}
        className="border min-w-[340px] rounded-md px-4 py-2"
        type="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        // defaultValue={"venkat1234"}
        className="border min-w-[340px] rounded-md px-4 py-2"
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-green-800 px-4 py-2 rounded-md" type="submit">
        signup
      </button>
      <p>
        already an user{" "}
        <Link href={"/login"} className="underline hover:text-green-800">
          login
        </Link>
      </p>
    </form>
  );
};

export default Signup;
