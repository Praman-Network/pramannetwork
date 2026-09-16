import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://tkmduvvaygyucegqlhlq.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'your_supabase_service_role_key_here'; // Replace with your actual key

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function test() {
  const { data, error } = await supabase
    .from('verification_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) {
    console.error('Error fetching logs:', error);
  } else {
    console.log('Recent logs in DB:');
    console.dir(data, { depth: null });
  }
}

test();
