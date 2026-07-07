import { env } from "@/lib/env";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "@/server/db/global";

const globalDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const conn = globalDb.conn ?? postgres(env.DATABASE_URL);
if (env.NODE_ENV !== "production") globalDb.conn = conn;

export const db = drizzle(conn, { schema });
