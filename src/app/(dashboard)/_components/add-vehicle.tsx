"use client";

import { listOfVehicles } from "@/lib/validation/vehicle";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  vehicleValidation,
  ListOfVehiclesType,
  vehicleValidationType,
} from "@/lib/validation/vehicle";
import { zodResolver } from "@hookform/resolvers/zod";
import { useVehicle } from "@/providers/vehicle-provider";
import { VehicleType } from "@/server/db/schema";

interface AddVehicleProps {
  defaultValues?: VehicleType;
}

const AddVehicle: FC<AddVehicleProps> = ({ defaultValues }) => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<vehicleValidationType>({
    resolver: zodResolver(vehicleValidation),
    defaultValues: {
      model: defaultValues?.model,
      name: defaultValues?.name,
      year: defaultValues?.year,
    },
  });

  const { addVehicle, updateVehicle } = useVehicle();
  const submitHandler = async function (data: vehicleValidationType) {
    if (defaultValues?.id) {
      updateVehicle(data, defaultValues.id);
    }
    if (!defaultValues?.id) {
      addVehicle(data);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col rounded-xl items-center justify-center gap-4 max-w-[560px] bg-violet-500 p-48"
    >
      <div className="flex items-start flex-col gap-2">
        <label>Name</label>
        <select className="border" defaultValue={"Honda"} {...register("name")}>
          {listOfVehicles.map((item, i) => (
            <option value={item} key={i}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-start flex-col gap-2">
        <label>Model</label>
        <input className="border" {...register("model")} type="text" />
      </div>
      <div className="flex items-start flex-col gap-2">
        <label>Year</label>
        <input className="border" {...register("year")} type="text" />
      </div>
      <button
        className="bg-violet-800 px-8 py-3 rounded-md cursor-pointer"
        disabled={isSubmitting}
        type="submit"
      >
        Add
      </button>
    </form>
  );
};

export default AddVehicle;
