import { createClient } from '@supabase/supabase-js';
import http from 'http';

const SUPABASE_URL = 'https://tkmduvvaygyucegqlhlq.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'your_supabase_service_role_key_here'; // Replace with your actual key

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function test() {
  // Get an active API key to test with
  const { data: keyData, error } = await supabase
    .from('api_keys')
    .select('*')
    .eq('is_active', true)
    .limit(1)
    .single();

  if (error || !keyData) {
    console.error('Failed to get an API key:', error);
    return;
  }
  
  const apiKey = keyData.key_value;
  console.log('Using API Key:', apiKey);

  // Send request to localhost:5050/api/v1/verify-zk
  const data = JSON.stringify({
    proof: "test-proof",
    publicInputs: "test-inputs"
  });

  const options = {
    hostname: 'localhost',
    port: 5050,
    path: '/api/v1/verify-zk',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'Origin': keyData.allowed_origins && keyData.allowed_origins.length > 0 ? keyData.allowed_origins[0] : 'http://localhost:3000'
    }
  };

  console.log('Sending request to auth server...');
  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    res.on('data', (d) => {
      process.stdout.write(d);
      console.log('\n');
    });
  });

  req.on('error', (error) => {
    console.error('Error hitting auth server:', error);
  });

  req.write(data);
  req.end();
}

test();
