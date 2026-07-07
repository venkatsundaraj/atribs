import { FC } from "react";
import Signup from "../_components/sign-up";
import { useSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";

interface pageProps {}

const page = async ({}) => {
  const auth = await useSession();

  if (auth.success) {
    redirect("/dashboard");
  }
  return <Signup />;
};

export default page;
