import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error("Missing Supabase environment variables");
// }

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const supabaseUrl = "https://axucboktznmkqtofrbvr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4dWNib2t0em5ta3F0b2ZyYnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4Nzk2MjAsImV4cCI6MjA2NTQ1NTYyMH0.kchLu5n3oKABRlsGLEc53echrb47JfB0a3qLtQdPaPA";
export const supabase = createClient(supabaseUrl, supabaseKey);
