import { listOfVehicles } from "@/lib/validation/vehicle";
import { pgEnum } from "drizzle-orm/pg-core";

export const userRole = pgEnum("role_enum", ["user", "admin"]);
export const carName = pgEnum("car_name_enum", listOfVehicles);
