import AddVehicle from "@/app/(dashboard)/_components/add-vehicle";
import { checkAdmin, useSession } from "@/lib/auth-utils";
import { notFound, redirect } from "next/navigation";
import { FC } from "react";

interface pageProps {}

const page = async ({}) => {
  const admin = await checkAdmin();

  if (!admin.success) {
    return <p>You are not an admin</p>;
  }

  return <AddVehicle />;
};

export default page;
