import { supabase } from '../utils/supabase.js';

export const verifyApiKey = async (req, res, next) => {
  // Extract API key from x-api-key header
  const apiKey = req.headers['x-api-key'];
  
  // Extract Origin or Referer
  const requestOrigin = req.headers.origin || req.headers.referer;

  if (!apiKey) {
    return res.status(401).json({ 
      success: false, 
      error_code: "MISSING_API_KEY", 
      message: "API Key is required in headers (x-api-key)." 
    });
  }

  try {
    // Query Supabase using service role credentials to check the key status
    const { data: keyData, error } = await supabase
      .from('api_keys')
      .select('allowed_origins, is_active')
      .eq('key_value', apiKey)
      .single();

    // Check if key exists and is active
    if (error || !keyData || !keyData.is_active) {
      return res.status(401).json({ 
        success: false, 
        error_code: "INVALID_API_KEY", 
        message: "The provided API key is invalid or inactive." 
      });
    }

    const allowedOrigins = keyData.allowed_origins;
    
    // Origin Whitelist Logic (Enforce only if origins are whitelisted)
    if (allowedOrigins && allowedOrigins.length > 0) {
      if (!requestOrigin) {
        return res.status(403).json({
          success: false,
          error_code: "ORIGIN_NOT_PROVIDED",
          message: "Origin or Referer header is required for this whitelisted API key."
        });
      }

      // Check if incoming Origin starts with or exactly matches any whitelisted domain
      const isAllowed = allowedOrigins.some(origin => {
        const cleanOrigin = origin.replace(/\/$/, ""); // Strip trailing slash for exact matches
        const cleanRequest = requestOrigin.replace(/\/$/, "");
        return cleanRequest === cleanOrigin || cleanRequest.startsWith(cleanOrigin);
      });
      
      if (!isAllowed) {
        return res.status(403).json({ 
          success: false, 
          error_code: "ORIGIN_NOT_WHITELISTED", 
          message: `Origin '${requestOrigin}' is not whitelisted for this API Key.` 
        });
      }
    }

    // Pass verification check, call next route handler
    next();
  } catch (err) {
    console.error("API Key validation error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error during security verification." 
    });
  }
};
