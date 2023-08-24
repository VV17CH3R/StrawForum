import { drizzle } from "drizzle-orm/postgres-js";
import postgres from 'postgres';
import * as schema from "./schema";

const sql = postgres(`postgresql://postgres:q258069p32167@db.ujdnpacqelpldlwbhumq.supabase.co:5432/postgres`, {
    max:1
});

export const db = drizzle(sql, {
    schema,
  });
