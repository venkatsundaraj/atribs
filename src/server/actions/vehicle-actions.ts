"use server";

import {
  vehicleValidation,
  vehicleValidationType,
} from "@/lib/validation/vehicle";
import { db } from "../db";
import { user, vehicles, VehicleType } from "../db/schema";
import { checkAdmin, useSession } from "@/lib/auth-utils";
import { and, asc, desc, eq } from "drizzle-orm";

export const getAllVehicles = async function (): Promise<VehicleType[]> {
  return await db.select().from(vehicles).orderBy(desc(vehicles.updatedAt));
};

export const addVehicle = async function (
  data: vehicleValidationType,
): Promise<{ success: boolean; result: VehicleType | null; message: string }> {
  //validation
  const parsed = vehicleValidation.safeParse(data);

  if (!parsed.success) {
    return { success: false, result: null, message: "validation is failed" };
  }

  //auth
  const auth = await useSession();
  const authEmail = String(auth.email);
  if (!auth.success || !authEmail) {
    return { success: false, result: null, message: "auth failed" };
  }

  //check admin
  const adminUser = await db
    .select()
    .from(user)
    .where(and(eq(user.email, authEmail), eq(user.role, "admin")))
    .then((res) => res[0]);

  if (!adminUser.email) {
    return { success: false, result: null, message: "you are not admin" };
  }

  //add vehicle
  const id = crypto.randomUUID();
  const newVehicle = await db
    .insert(vehicles)
    .values({
      id: id,
      model: data.model,
      name: data.name,
      userId: adminUser.id,
      year: data.year,
    })
    .returning()
    .then((res) => res[0]);

  if (!newVehicle) {
    return {
      success: false,
      result: null,
      message: "something went wrong while updating the db",
    };
  }

  //res
  return { success: true, result: newVehicle, message: "update successful" };
};

export const getEditVehicleData = async function (
  id: string,
): Promise<{ success: boolean; result: VehicleType | null; message: string }> {
  const admin = await checkAdmin();
  if (!admin.success) {
    return {
      success: false,
      result: null,
      message: "you are not an admin",
    };
  }
  const vehicleData = await db
    .select()
    .from(vehicles)
    .where(eq(vehicles.id, id))
    .then((res) => res[0]);
  if (!vehicleData) {
    return {
      success: false,
      result: null,
      message: "there were no data exists",
    };
  }
  return {
    success: true,
    result: vehicleData,
    message: "this is a legit data",
  };
};

export const deleteVehicle = async function (
  id: string,
): Promise<{ success: boolean; message: string }> {
  const admin = await checkAdmin();
  if (!admin.success) {
    return {
      success: false,

      message: "you are not an admin",
    };
  }
  await db.delete(vehicles).where(eq(vehicles.id, id));

  return {
    success: true,
    message: "this is a legit data",
  };
};

export const updateVehicle = async function (
  data: vehicleValidationType & { id: string },
) {
  const { id, ...vehicleData } = data;
  //validation
  const parsed = vehicleValidation.safeParse(vehicleData);

  if (!parsed.success) {
    return { success: false, result: null, message: "validation is failed" };
  }

  const parsedVehicleData = parsed.data;

  //auth
  const auth = await useSession();
  const authEmail = String(auth.email);
  if (!auth.success || !authEmail) {
    return { success: false, result: null, message: "auth failed" };
  }

  //check admin
  const adminUser = await db
    .select()
    .from(user)
    .where(and(eq(user.email, authEmail), eq(user.role, "admin")))
    .then((res) => res[0]);

  if (!adminUser.email) {
    return { success: false, result: null, message: "you are not admin" };
  }

  // update vehicle
  const newVehicle = await db
    .update(vehicles)
    .set(parsedVehicleData)
    .where(eq(vehicles.id, id))
    .returning()
    .then((res) => res[0]);

  if (!newVehicle.id) {
    return {
      success: false,
      result: null,
      message: "something went wron while updating db",
    };
  }
  return { success: true, result: newVehicle, message: "update is successful" };
};
