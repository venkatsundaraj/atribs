import z from "zod";

export const listOfVehicles = [
  "Honda",
  "BMW",
  "Minicooper",
  "Audi",
  "Benz",
] as const;

export type ListOfVehiclesType = (typeof listOfVehicles)[number];

export const vehicleValidation = z.object({
  name: z.enum(listOfVehicles),
  model: z.string().min(1),
  year: z.string().min(4),
});

export type vehicleValidationType = z.infer<typeof vehicleValidation>;
