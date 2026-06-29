import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env relative to this file's location to work across workspace execution contexts
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
// Supporting both env name patterns to be highly compatible
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn("WARNING: Supabase URL or Service Role Key is missing from environment variables.");
}

// Initialize Supabase Client with full admin privileges bypassing RLS
export const supabase = createClient(supabaseUrl || '', supabaseServiceKey || '');
