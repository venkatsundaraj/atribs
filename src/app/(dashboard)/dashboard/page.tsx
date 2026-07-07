import { useSession, verifyJWT } from "@/lib/auth-utils";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { FC } from "react";
import AllVehicles from "../_components/all-vehicles";

interface pageProps {}

const page = async ({}: pageProps) => {
  return <AllVehicles />;
};

export default page;
