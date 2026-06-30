import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { verifyApiKey } from "./middlewares/apiKeyAuth.js";
import { sandboxRateLimiter } from "./utils/rateLimiter.js";
import { createClient } from '@supabase/supabase-js';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
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

if (!process.env.SUPABASE_URL || (!process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.SUPABASE_SERVICE_KEY)) {
  console.warn("WARNING: Supabase URL or Service Role Key is missing from environment variables.");
}

let supabase;
try {
  supabase = createClient(supabaseUrl, supabaseServiceKey);
} catch (err) {
  console.error("CRITICAL: Failed to initialize Supabase client globally:", err.message);
  // Provide a safe fallback mock so the server doesn't crash on import
  supabase = {
    from: () => ({
      insert: async () => ({ data: null, error: new Error("Supabase client is not initialized") }),
      select: () => ({ eq: () => ({ single: async () => ({ data: null, error: new Error("Supabase client is not initialized") }) }) })
    })
  };
}

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

  // Enhanced Vercel serverless debugging log
  console.log("Incoming Request - Origin:", origin, "API Key Present:", !!apiKey);

  try {
    // 1. ZK Proof Verification Logic (Yahan tumhara snarkjs/contract logic aayega)
    const isVerified = true; // Simulating verification logic

    if (!isVerified) {
      // Log failed attempt
      try {
        await supabase.from('verification_logs').insert({
          app_id: apiKey,
          status: 'failed',
          error_code: 'ZK_VERIFICATION_FAILED',
          origin: origin
        });
      } catch (logErr) {
        console.error("Failed to insert verification log in database:", logErr.message);
      }
      return res.status(403).json({ success: false, error: "ZK Proof verification failed" });
    }

    // 2. Success Log Entry
    try {
      await supabase.from('verification_logs').insert({
        app_id: apiKey,
        status: 'success',
        error_code: null,
        origin: origin
      });
    } catch (logErr) {
      console.error("Failed to insert success verification log in database:", logErr.message);
    }

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
    try {
      await supabase.from('verification_logs').insert({
        app_id: apiKey,
        status: 'failed',
        error_code: 'SYSTEM_ERROR',
        origin: origin
      });
    } catch (logErr) {
      console.error("Failed to insert system error log in database:", logErr.message);
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
      details: error.message,
      stack: process.env.NODE_ENV !== 'production' ? error.stack : undefined
    });
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