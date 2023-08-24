import { SupabaseClient } from "@supabase/supabase-js";

const dbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const dbSecretKey = process.env.SUPABASE_SECRET_KEY;

export const dbServer = new SupabaseClient(dbUrl as string, dbSecretKey as string);