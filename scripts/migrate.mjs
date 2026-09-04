// One-off DB setup. Run with: node scripts/migrate.mjs
// Requires DATABASE_URL in the environment (see .env.local).
import { neon } from "@neondatabase/serverless";
import { readFileSync } from "fs";

const envLocal = readFileSync(new URL("../.env.local", import.meta.url), "utf-8");
for (const line of envLocal.split("\n")) {
  const match = line.match(/^([A-Z0-9_]+)="?(.*?)"?$/);
  if (match && !process.env[match[1]]) process.env[match[1]] = match[2];
}

const sql = neon(process.env.DATABASE_URL);

await sql`
  CREATE TABLE IF NOT EXISTS registrations (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    organization TEXT NOT NULL DEFAULT '',
    phone TEXT NOT NULL,
    email TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;

await sql`
  ALTER TABLE registrations
  ADD COLUMN IF NOT EXISTS attended BOOLEAN NOT NULL DEFAULT false
`;

console.log("registrations table ready");
