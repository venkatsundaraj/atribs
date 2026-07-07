import { listOfVehicles } from "@/lib/validation/vehicle";
import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTableCreator,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { carName, userRole } from "./enums";

const createTable = pgTableCreator((name) => `atribs_${name}`);

export const user = createTable("user", {
  id: text("id").primaryKey().notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  role: userRole("role").default("user"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const vehicles = createTable("vehicles", {
  id: text("id").primaryKey().notNull(),
  name: carName("car_name").default("Honda").notNull(),
  model: text("model").notNull(),
  year: text("year").notNull(),

  userId: text("user_id")
    .references(() => user.id)
    .notNull(),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UserType = typeof user.$inferSelect;
export type VehicleType = typeof vehicles.$inferSelect;

export const userRelations = relations(user, ({ many }) => ({
  vehicles: many(vehicles),
}));

export const vehicleRelations = relations(vehicles, ({ one }) => ({
  user: one(user, { fields: [vehicles.id], references: [user.id] }),
}));
