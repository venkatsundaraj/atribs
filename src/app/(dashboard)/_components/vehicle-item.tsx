"use client";

import { VehicleType } from "@/server/db/schema";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface VehicleItemProps {
  vehicles: VehicleType[];
}

const VehicleItem: FC<VehicleItemProps> = ({ vehicles }) => {
  const router = useRouter();
  return (
    <ul>
      {vehicles.map((item, i) => (
        <li key={item.id}>
          {item.name} - {item.model} - {item.year}
          {"  "}
          <button
            className="cursor-pointer"
            onClick={() => {
              router.push(`/dashboard/vehicle/edit/${item.id}`);
            }}
          >
            edit
          </button>
        </li>
      ))}
    </ul>
  );
};

export default VehicleItem;
