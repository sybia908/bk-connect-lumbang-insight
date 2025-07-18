
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://pcfutbncphzgvvcrwiqy.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjZnV0Ym5jcGh6Z3Z2Y3J3aXF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MTcyNTgsImV4cCI6MjA2NzE5MzI1OH0.cRC1nkR89hU72R4Tv1up1-cWbO1vjUfLPIIl18Mgcls";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: {
      getItem: (key: string) => {
        if (typeof window === 'undefined') return null;
        return document.cookie
          .split('; ')
          .find(row => row.startsWith(`${key}=`))
          ?.split('=')[1] || null;
      },
      setItem: (key: string, value: string) => {
        if (typeof window === 'undefined') return;
        document.cookie = `${key}=${value}; path=/; secure; samesite=strict; max-age=604800`; // 7 days
      },
      removeItem: (key: string) => {
        if (typeof window === 'undefined') return;
        document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      }
    },
    persistSession: true,
    autoRefreshToken: true,
  }
});
