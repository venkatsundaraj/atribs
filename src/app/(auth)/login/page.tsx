import { useSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { FC } from "react";
import Login from "../_components/login";

interface pageProps {}

const page = async ({}) => {
  const auth = await useSession();

  if (auth.success) {
    redirect("/dashboard");
  }
  return <Login />;
};

export default page;
