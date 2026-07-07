"use client";

import { useAddVehicle, useUpdateVehicle } from "@/hooks/use-vehicle";
import { vehicleValidationType } from "@/lib/validation/vehicle";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useMemo } from "react";

type VehicleContextType = {
  addVehicle: (data: vehicleValidationType) => void;
  updateVehicle: (data: vehicleValidationType, id: string) => void;
};
const VehicleContext = createContext<VehicleContextType | null>(null);

export const VehicleContextProvider = function ({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { mutateAsync: addVehicleData } = useAddVehicle();
  const { mutateAsync: updateVehicleData } = useUpdateVehicle();
  const addVehicle = useCallback(async function (data: vehicleValidationType) {
    const res = await addVehicleData(data);

    if (res.success) {
      console.log(res.result);
      return router.push("/dashboard/vehicle/all");
    }
  }, []);

  const updateVehicle = useCallback(async function (
    data: vehicleValidationType,
    id: string,
  ) {
    const res = await updateVehicleData({ ...data, id });

    if (res.success) {
      console.log(res.result);
      return router.push("/dashboard/vehicle/all");
    }
  }, []);

  const value = useMemo(
    () => ({ addVehicle, updateVehicle }),
    [addVehicle, updateVehicle],
  );
  return (
    <VehicleContext.Provider value={value}>{children}</VehicleContext.Provider>
  );
};

export const useVehicle = function () {
  const ctx = useContext(VehicleContext);

  if (!ctx) {
    throw new Error("the component should be wrapped");
  }

  return ctx;
};
