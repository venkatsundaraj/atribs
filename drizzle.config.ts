import { env } from "@/lib/env";
import { Config, defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: { url: env.DATABASE_URL },
  out: "./drizzle",
  schema: "./src/server/db/global.ts",
  tablesFilter: [`atribs_*`],
}) satisfies Config;
