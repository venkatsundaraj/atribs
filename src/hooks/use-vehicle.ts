import { vehicleValidationType } from "@/lib/validation/vehicle";
import { addVehicle, updateVehicle } from "@/server/actions/vehicle-actions";
import { useMutation } from "@tanstack/react-query";

export const useAddVehicle = function () {
  return useMutation({
    mutationFn: async function (data: vehicleValidationType) {
      return await addVehicle(data);
    },
    mutationKey: ["add-vehicle"] as const,
  });
};

export const useUpdateVehicle = function () {
  return useMutation({
    mutationFn: async function (data: vehicleValidationType & { id: string }) {
      return await updateVehicle(data);
    },
    mutationKey: ["update-vehicle"] as const,
  });
};
