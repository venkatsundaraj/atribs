import AddVehicle from "@/app/(dashboard)/_components/add-vehicle";
import { checkAdmin } from "@/lib/auth-utils";
import { getEditVehicleData } from "@/server/actions/vehicle-actions";
import { notFound } from "next/navigation";
import { FC } from "react";

interface pageProps {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: pageProps) => {
  const { id } = await params;

  const admin = await checkAdmin();

  if (!admin.success) {
    return <p>You are not an admin</p>;
  }

  const filteredVehicle = await getEditVehicleData(id);

  if (!filteredVehicle.success || !filteredVehicle.result) {
    return notFound();
  }

  return <AddVehicle defaultValues={filteredVehicle.result} />;
};

export default page;
