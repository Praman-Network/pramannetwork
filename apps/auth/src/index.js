import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { verifyApiKey } from "./middlewares/apiKeyAuth.js";
import { sandboxRateLimiter } from "./utils/rateLimiter.js";
import { createClient } from '@supabase/supabase-js';

if (!process.env.VERCEL) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  dotenv.config({ path: path.resolve(__dirname, "../.env") });
}

const app = express();

const allowedOrigins = [
  'https://www.praman.network', 
  'https://praman.network'
];

if (process.env.NODE_ENV !== 'production') {
  allowedOrigins.push('http://localhost:5173');
  allowedOrigins.push('http://localhost:3000');
  allowedOrigins.push('http://localhost:3001');
}

const corsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
};

// Apply Global Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(sandboxRateLimiter); // Standard global rate limiter

const supabaseUrl = process.env.SUPABASE_URL || 'https://tkmduvvaygyucegqlhlq.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || 'placeholder-key';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Base Health Check endpoint
app.get("/", (req, res) => {
  res.send("Praman Network Authentication Gateway. Status: Operational.");
});

// Protected Verification Route
// Client SDK calls this POST request with proof data, passing x-api-key in headers
app.post("/api/v1/verify-zk", verifyApiKey, async (req, res) => {
  const { proof, publicInputs } = req.body;
  const origin = req.headers.origin || 'unknown';
  const apiKey = req.headers['x-api-key'];

  try {
    // 1. ZK Proof Verification Logic (Yahan tumhara snarkjs/contract logic aayega)
    const isVerified = true; // Simulating verification logic

    if (!isVerified) {
      // Log failed attempt
      await supabase.from('verification_logs').insert({
        app_id: apiKey,
        status: 'failed',
        error_code: 'ZK_VERIFICATION_FAILED',
        origin: origin
      });
      return res.status(403).json({ success: false, error: "ZK Proof verification failed" });
    }

    // 2. Success Log Entry
    await supabase.from('verification_logs').insert({
      app_id: apiKey,
      status: 'success',
      error_code: null,
      origin: origin
    });

    // 3. Success Response
    res.status(200).json({
      success: true,
      message: "Zero Knowledge Proof assertion verified successfully.",
      verifiedAt: new Date().toISOString(),
      details: {
        cycles: 42,
        proofHash: proof ? "0x" + Math.random().toString(16).substring(2, 10) : "null",
        proverNode: "praman-proof-engine-alpha"
      }
    });

  } catch (error) {
    console.error("Verification Route Error:", error);
    
    // Log unexpected system errors
    await supabase.from('verification_logs').insert({
      app_id: apiKey,
      status: 'failed',
      error_code: 'SYSTEM_ERROR',
      origin: origin
    });

    res.status(500).json({ success: false, message: "Internal server error during verification" });
  }
});

// Export app for serverless function platforms like Vercel
export default app;

// Listen only when running locally, not in serverless environments
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(5050, () => {
    console.log(`Auth Server is running on port 5050`);
  });
}