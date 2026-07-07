import { getAllVehicles } from "@/server/actions/vehicle-actions";
import { FC } from "react";
import VehicleItem from "./vehicle-item";

interface AllVehiclesProps {}

const AllVehicles = async ({}) => {
  const vehicles = await getAllVehicles();
  return vehicles.length ? (
    <VehicleItem vehicles={vehicles} />
  ) : (
    <p>No vehicles updated yet.</p>
  );
};

export default AllVehicles;
