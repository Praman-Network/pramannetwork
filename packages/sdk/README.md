---
title: SDK Reference
sidebar_label: SDK Reference
sidebar_position: 3
---

# @praman-network/sdk

[![npm version](https://img.shields.io/badge/npm-v0.1.10-blue.svg)](https://www.npmjs.com/package/@praman-network/sdk)
[![Beta Status](https://img.shields.io/badge/status-beta-orange.svg)](#)
[![Network](https://img.shields.io/badge/network-Polygon%20Amoy-purple.svg)](#)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](#)

PramanAuth is a decentralized Identity-as-a-Service (IaaS) SDK providing privacy-preserving, Zero-Knowledge (ZK) biometric authentication for Web3 applications. Powered by a hybrid Web2.5 architecture, PramanAuth secures client-to-backend communication via **API Key authentication** and **Origin Whitelisting**, enabling gasless biometric verification for end-users.

---

## Why PramanAuth?

Modern authentication solutions force a trade-off between user convenience and security. PramanAuth bridges this gap by combining decentralized biometrics with zero-knowledge proofs:

*   **Zero Biometric Leakage:** No raw biometric data (images, videos, or raw face descriptors) is ever sent to or stored on any centralized server. Biometric templates are quantized, hashed, and encrypted client-side using wallet signatures before being archived on IPFS.
*   **Browser-Side ZK Verification:** Biometric comparisons are computed locally in the user's browser using client-side **Groth16 ZK-SNARK Proving (via SnarkJS)**. Raw biometrics remain completely private, and only the ZK proof is dispatched for verification.
*   **Gasless User Experience:** All blockchain writes, gas sponsorship, and IPFS pinning are managed securely by the Backend Relayer. Users get a fast, signature-based sign-in experience with zero transaction costs.

---

## Installation & Prerequisites

To prevent compilation and runtime helpers resolution issues in bundlers, **`tslib` is required as a peer dependency** of `@praman-network/sdk`. Install both packages using npm:

```bash
npm install @praman-network/sdk tslib
```

### Polyfill Setup for Bundlers (Vite)
Web3 libraries depend on Node.js built-ins. If you are using Vite, install Node polyfills to avoid `Buffer is not defined` or `global is not defined` runtime errors:

**1. Install the polyfill plugin:**
```bash
npm install vite-plugin-node-polyfills --save-dev
```

**2. Update `vite.config.ts` or `vite.config.js`:**
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [
    react(),
    // Ye plugin global, Buffer, process sabko browser me available kar dega
    nodePolyfills({
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
    }),
  ],
  optimizeDeps: {
    include: ['@praman-network/sdk', '@lit-protocol/lit-node-client', 'tslib']
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
})
```

---

## SDK Initialization

The SDK client must be initialized once at the entry point of your frontend application. The client stores the configured API key and backend service endpoint securely within the SDK instance state for subsequent API calls.

Initialize using one of the following methods:

### Method 1: Simple Initialization (Default Production)
Suitable for standard production applications. Initializes the client pointing to the global Praman production relayer gateway (`https://api.praman.network`):

```typescript
import { initPraman } from '@praman-network/sdk';

// Initializes with production relayer defaults
const praman = initPraman("pm_live_your_api_key");
```

### Method 2: Custom Configuration (Local/Custom Backend)
Required when testing integrations locally against an Express microservice backend (e.g., `http://localhost:5050`) or using a customized deployment configuration:

```typescript
import { initPraman } from '@praman-network/sdk';

const praman = initPraman({
  apiKey: "pm_dev_your_api_key",
  network: "polygon-amoy",
  backendUrl: "http://localhost:5050", // Custom/Local relayer endpoint
  livenessLevel: "standard"            // 'strict' | 'standard' | 'off'
});
```

---

## Framework Support

The `@praman-network/sdk` is designed to be framework-agnostic. 

### 1. Next.js (App Router)
Since Next.js App Router renders pages server-side by default, SDK components and hooks must be constrained to the client boundary using the `'use client'` directive.

Create a wrapper client component or add the directive to the top of your layout/page:

```typescript
'use client';

import React, { useEffect } from 'react';
import { initPraman } from '@praman-network/sdk';

// Initialize the SDK inside client components
const praman = initPraman(
  process.env.NEXT_PUBLIC_PRAMAN_API_KEY || '',
  process.env.NEXT_PUBLIC_PRAMAN_BACKEND_URL // Will fall back to production if undefined
);

export default function AuthPage() {
  // Client-side authentication logic
  return (
    <div>
      <button onClick={() => praman.loginWithPopup()}>Sign In</button>
    </div>
  );
}
```

### 2. Vanilla JS / Single Page Applications (SPAs)
For custom scripts or simple frontend integrations, import from the compiled CommonJS or ES build module:

```javascript
import { initPraman, verifyZKProof } from '@praman-network/sdk';

// Initialize client
initPraman("pm_dev_key", "http://localhost:5050");

// Dispatch proof verification
async function authenticateUser(address, proof, signals) {
  try {
    const result = await verifyZKProof(address, proof, signals);
    if (result.success) {
      console.log("Authenticated successfully!");
    }
  } catch (error) {
    console.error("Verification failed:", error.message);
  }
}
```

---

## Security Architecture

To protect the verification relay against Sybil attacks and credential leaks, communication is locked down via two mechanisms configured in your **Developer Dashboard**:

1.  **API Key Validation (`x-api-key`):** The SDK automatically transmits your configured API key in the request headers on all verification API calls.
2.  **Origin Whitelisting:** The security relayer checks incoming request headers (`origin` and `referer`). Requests from non-whitelisted domains are strictly rejected by the backend to prevent API key usage outside authorized apps.

```mermaid
sequenceDiagram
    autonumber
    participant App as Developer App (Browser)
    participant SDK as Praman Client SDK
    participant Relayer as Security Relayer (apps/auth)
    participant Contract as FaceRegistry (Polygon)

    App->>SDK: initPraman(apiKey, [backendUrl])
    App->>SDK: verifyZKProof(userAddress, proof, publicSignals)
    Note over SDK: Retrieve stored apiKey & backendUrl
    SDK->>Relayer: POST /api/v1/verify-zk<br/>Headers: { x-api-key, origin }
    Note over Relayer: verifyApiKey & verifyOrigin Middleware<br/>Validate API Key & Origin whitelist
    Relayer->>Contract: Validate ZK signals & state
    Contract-->>Relayer: On-chain Registry Status
    Relayer-->>SDK: Return JSON Result (success: true)
    SDK-->>App: Resolve verification response
```

---

## Verification & Production Hardening

### Environment Guard
The SDK contains an automated **Environment Guard** that monitors execution modes.

> [!WARNING]
> **Environment Strict Mode:** In production builds (`process.env.NODE_ENV === 'production'` or `import.meta.env.MODE === 'production'`), the SDK enforces a strict, hard-fail security policy. If ZK proof generation fails due to browser memory limits, asset delivery problems, or system timeouts, authentication fails immediately. Mock proofs are strictly rejected in production.

### Backend Token Filtering
When integrating PramanAuth within your own server backend, always inspect and filter claims:

> [!IMPORTANT]
> **Mock Token Filter:** Always check the `is_mock` flag in the decoded JWT payload on your backend. If `is_mock: true` is detected in a production build, your backend **must** reject the authentication session immediately to prevent mock-bypass exploits.

```typescript
import { getPramanClient } from '@praman-network/sdk';

const praman = getPramanClient();
const result = praman.verifyToken(receivedToken);

if (!result.valid) {
  throw new Error("Invalid cryptographic session token");
}

if (result.payload.is_mock && process.env.NODE_ENV === 'production') {
  throw new Error("Unauthorized: Mock tokens are restricted in production environments");
}
```

---

## Troubleshooting

#### 1. Why does my registration fail with "Biometric face identity already registered"?
The Polygon Amoy smart contract registry enforces Sybil resistance by hashing face descriptors. If a user's biometric baseline matches an already registered identity, the contract rejects the transaction. For development, use mock flags or register with a unique face baseline.

#### 2. CORS Errors connecting to Backend Relayer
Verify that your origin domain (e.g. `http://localhost:5173`) is listed in the allowed origins configuration of your Express backend relayer or your Developer Dashboard settings.

#### 3. ZK Proof Generation crashes or times out
Ensure that WebAssembly support is enabled in the target browser environment. WebAssembly is required to execute the client-side snarkjs prover efficiently.

---

## Changelog

*   **`v0.1.10` (Current)**
    *   Added support for direct API key verification headers and custom backend relay routing.
    *   Implemented standalone `verifyZKProof` and `loginWithPraman` exports.
    *   Moved `tslib` to peerDependencies.
*   **`v0.1.2`**
    *   Implemented `getStableVector` biometric stabilization layer.
*   **`v0.1.0`**
    *   Initial release with Lit Protocol encryption, IPFS enclaves, and basic face scanning.

---

## 🎨 Premium Login Component Examples

Integrate a beautiful, cyber-minimalist login page that fits perfectly with PramanAuth's biometric focus. Below are complete, styled component implementations for both **React** and **Vue 3**.

### ⚛️ React Implementation

Here is a complete setup with a styled glassmorphic biometric login card (`Login.jsx`) and the main application coordinator (`App.jsx`).

#### 1. The main application coordinator (`App.jsx`)

This matches the initialization and auth flow. It manages the login popup and tracks the user state:

```javascript
import { useState } from 'react';
import { initPraman } from '@praman-network/sdk';
import LoginPage from './Login';

// Initialize with your test credentials
const praman = initPraman({
  apiKey: 'pk_test_DOd1GeOt6KW4SzO7EGLIwWYF', // Replace with your actual API key
  network: "polygon-amoy",
  idpUrl: "https://auth.praman.network",
  backendUrl: "https://api.praman.network"
});

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await praman.loginWithPopup({ scopes: ['email', 'profile'] });
      if (result.success) {
        setUser(result.user);
        console.log("User Data:", result.user);
      } else {
        setError("Authentication failed. Please try again.");
      }
    } catch (err) {
      console.error("Auth failed:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0a0a0c', 
      color: '#ffffff',
      fontFamily: 'Inter, system-ui, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      {!user ? (
        <LoginPage 
          onLogin={handleLogin} 
          loading={loading} 
          error={error} 
        />
      ) : (
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '32px',
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            fontSize: '24px'
          }}>
            ✓
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>Authenticated Successfully</h2>
          <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '24px', wordBreak: 'break-all' }}>
            <strong>DID:</strong> {user.did}
          </p>
          <button 
            onClick={() => setUser(null)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              background: 'transparent',
              color: '#ffffff',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
```

#### 2. The styled login component (`Login.jsx`)

Save this as `Login.jsx` to build a clean, animated login card:

```jsx
import React from 'react';

export default function LoginPage({ onLogin, loading, error }) {
  return (
    <div style={styles.card}>
      <div style={styles.glow} />
      
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logoContainer}>
          <span style={styles.logo}>P</span>
        </div>
        <h2 style={styles.title}>PramanAuth Test App</h2>
        <p style={styles.subtitle}>Decentralized Zero-Knowledge Biometric Authentication</p>
      </div>

      {/* Biometric Icon & Animation */}
      <div style={styles.scannerContainer}>
        <div style={{
          ...styles.scannerRing,
          animation: loading ? 'pulse 1.5s infinite ease-in-out' : 'none',
          borderColor: loading ? '#6366f1' : 'rgba(255, 255, 255, 0.1)'
        }}>
          <svg style={{
            ...styles.fingerprintIcon,
            fill: loading ? '#6366f1' : '#a1a1aa'
          }} viewBox="0 0 24 24" width="64" height="64">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
          </svg>
          {loading && <div style={styles.scanBar} />}
        </div>
      </div>

      {/* Button & Feedback */}
      <div style={styles.actionContainer}>
        {error && (
          <div style={styles.errorAlert}>
            {error}
          </div>
        )}

        <button 
          onClick={onLogin} 
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? (
            <span style={styles.loadingText}>
              <span style={styles.spinner} /> Verifying Biometrics...
            </span>
          ) : (
            "Sign In with PramanAuth"
          )}
        </button>
      </div>

      {/* CSS Keyframes injected dynamically */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
          50% { transform: scale(1.03); box-shadow: 0 0 20px 10px rgba(99, 102, 241, 0.1); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
        }
        @keyframes scan {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  card: {
    position: 'relative',
    background: 'rgba(15, 15, 20, 0.7)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '24px',
    padding: '40px 32px',
    maxWidth: '440px',
    width: '100%',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden'
  },
  glow: {
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 60%)',
    pointerEvents: 'none',
    zIndex: 0
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
    zIndex: 1
  },
  logoContainer: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
  },
  logo: {
    fontWeight: 'bold',
    fontSize: '22px',
    color: '#fff'
  },
  title: {
    fontSize: '22px',
    fontWeight: '700',
    marginBottom: '8px',
    color: '#ffffff',
    letterSpacing: '-0.025em'
  },
  subtitle: {
    fontSize: '13px',
    color: '#8e8e9f',
    lineHeight: '1.5',
    margin: 0
  },
  scannerContainer: {
    marginBottom: '32px',
    zIndex: 1
  },
  scannerRing: {
    position: 'relative',
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    border: '2px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    overflow: 'hidden'
  },
  fingerprintIcon: {
    transition: 'fill 0.3s ease'
  },
  scanBar: {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: '3px',
    background: 'linear-gradient(90deg, transparent, #6366f1, transparent)',
    boxShadow: '0 0 8px #6366f1',
    animation: 'scan 2s infinite linear'
  },
  actionContainer: {
    width: '100%',
    zIndex: 1
  },
  button: {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: '600',
    boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
    transition: 'all 0.2s ease',
  },
  errorAlert: {
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    borderRadius: '8px',
    padding: '12px',
    color: '#f87171',
    fontSize: '13px',
    marginBottom: '16px',
    textAlign: 'center'
  },
  loadingText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  spinner: {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTopColor: '#ffffff',
    animation: 'spin 0.8s infinite linear'
  }
};
```

---

### 🟢 Vue 3 Single File Component (`Login.vue`)

Here is the equivalent, beautifully styled **Vue 3 Single File Component** using `<script setup>` syntax and scoped CSS:

```vue
<template>
  <div class="praman-auth-container">
    <!-- Logged Out / Login Card -->
    <div v-if="!user" class="login-card">
      <div class="glow-effect"></div>
      
      <!-- Card Header -->
      <div class="card-header">
        <div class="logo-box">
          <span class="logo-text">P</span>
        </div>
        <h2 class="title">PramanAuth Test App</h2>
        <p class="subtitle">Decentralized Zero-Knowledge Biometric Authentication</p>
      </div>

      <!-- Scanner Indicator -->
      <div class="scanner-section">
        <div class="scanner-ring" :class="{ 'is-loading': loading }">
          <svg class="biometric-icon" :class="{ 'active-icon': loading }" viewBox="0 0 24 24" width="64" height="64">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
          </svg>
          <div v-if="loading" class="scanner-bar"></div>
        </div>
      </div>

      <!-- Action Button & Errors -->
      <div class="action-section">
        <div v-if="error" class="error-msg">
          {{ error }}
        </div>

        <button 
          @click="handleLogin" 
          :disabled="loading" 
          class="login-button"
        >
          <template v-if="loading">
            <span class="spinner"></span>
            Verifying Biometrics...
          </template>
          <template v-else>
            Sign In with PramanAuth
          </template>
        </button>
      </div>
    </div>

    <!-- Logged In State -->
    <div v-else class="success-card">
      <div class="check-badge">✓</div>
      <h2 class="title">Authenticated Successfully</h2>
      <p class="did-info"><strong>DID:</strong> {{ user.did }}</p>
      <button @click="logout" class="signout-button">Sign Out</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { initPraman } from '@praman-network/sdk';

// Initialize with your test credentials
const praman = initPraman({
  apiKey: 'pk_test_DOd1GeOt6KW4SzO7EGLIwWYF', // Replace with your actual API key
  network: "polygon-amoy",
  idpUrl: "https://auth.praman.network",
  backendUrl: "https://api.praman.network"
});

const user = ref(null);
const loading = ref(false);
const error = ref(null);

const handleLogin = async () => {
  loading.value = true;
  error.value = null;
  try {
    const result = await praman.loginWithPopup({ scopes: ['email', 'profile'] });
    if (result.success) {
      user.value = result.user;
      console.log("User Data:", result.user);
    } else {
      error.value = "Authentication failed. Please try again.";
    }
  } catch (err) {
    console.error("Auth failed:", err);
    error.value = err.message || "An unexpected error occurred.";
  } finally {
    loading.value = false;
  }
};

const logout = () => {
  user.value = null;
};
</script>

<style scoped>
.praman-auth-container {
  min-height: 100vh;
  background-color: #0a0a0c;
  color: #ffffff;
  font-family: 'Inter', system-ui, sans-serif;
  display: flex;
  align-items: center;
  justifyContent: center;
  padding: 20px;
}

.login-card, .success-card {
  position: relative;
  background: rgba(15, 15, 20, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 40px 32px;
  max-width: 440px;
  width: 100%;
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

.glow-effect {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 60%);
  pointer-events: none;
  z-index: 0;
}

.card-header {
  text-align: center;
  margin-bottom: 32px;
  z-index: 1;
}

.logo-box {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  display: flex;
  align-items: center;
  justifyContent: center;
  margin: 0 auto 16px;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.logo-text {
  font-weight: bold;
  font-size: 22px;
  color: #fff;
}

.title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #ffffff;
  letter-spacing: -0.025em;
}

.subtitle {
  font-size: 13px;
  color: #8e8e9f;
  line-height: 1.5;
  margin: 0;
}

.scanner-section {
  margin-bottom: 32px;
  z-index: 1;
}

.scanner-ring {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justifyContent: center;
  background-color: rgba(255, 255, 255, 0.02);
  overflow: hidden;
  transition: all 0.3s ease;
}

.scanner-ring.is-loading {
  border-color: #6366f1;
  animation: pulse 1.5s infinite ease-in-out;
}

.biometric-icon {
  fill: #a1a1aa;
  transition: fill 0.3s ease;
}

.biometric-icon.active-icon {
  fill: #6366f1;
}

.scanner-bar {
  position: absolute;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, transparent, #6366f1, transparent);
  box-shadow: 0 0 8px #6366f1;
  animation: scan 2s infinite linear;
}

.action-section {
  width: 100%;
  z-index: 1;
}

.login-button {
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justifyContent: center;
  gap: 8px;
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-msg {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 8px;
  padding: 12px;
  color: #f87171;
  font-size: 13px;
  margin-bottom: 16px;
  text-align: center;
}

.spinner {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  animation: spin 0.8s infinite linear;
}

/* Success State Styles */
.check-badge {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  display: flex;
  align-items: center;
  justifyContent: center;
  margin-bottom: 20px;
  font-size: 24px;
}

.did-info {
  color: #9ca3af;
  font-size: 14px;
  margin-bottom: 24px;
  word-break: break-all;
  text-align: center;
}

.signout-button {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: transparent;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* Animations */
@keyframes pulse {
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
  50% { transform: scale(1.03); box-shadow: 0 0 20px 10px rgba(99, 102, 241, 0.1); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
}

@keyframes scan {
  0% { top: 0%; }
  50% { top: 100%; }
  100% { top: 0%; }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
```

*   **`v0.1.0`**
    *   Initial release with Lit Protocol encryption, IPFS enclaves, and basic face scanning.
