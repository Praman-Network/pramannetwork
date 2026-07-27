import React from 'react';
import { Cpu, ShieldCheck, Database, Code, Shield, Brain, Building } from 'lucide-react';

export const categories = [
  {
    id: 'All',
    name: 'All Topics',
    count: 7,
    icon: Code,
    badgeClass: 'badge-cyan'
  },
  {
    id: 'Zero Knowledge',
    name: 'Zero Knowledge',
    count: 2,
    icon: Cpu,
    badgeClass: 'badge-cyan',
    description: 'zk-SNARKs, Groth16, Circom circuits, recursive proof aggregation, and cryptographic primitives.'
  },
  {
    id: 'Authentication',
    name: 'Authentication',
    count: 2,
    icon: ShieldCheck,
    badgeClass: 'badge-green',
    description: 'Passkeys, WebAuthn, hardware biometrics, FIDO2, and Sybil-resistant account security.'
  },
  {
    id: 'Blockchain',
    name: 'Blockchain',
    count: 1,
    icon: Database,
    badgeClass: 'badge-cyan',
    description: 'Layer-2 rollups, on-chain verifier smart contracts, gas optimization, and protocol architecture.'
  },
  {
    id: 'APIs',
    name: 'APIs & SDKs',
    count: 1,
    icon: Code,
    badgeClass: 'badge-purple',
    description: 'Developer integration guides, SDK reference, React hooks, and REST/GraphQL APIs.'
  },
  {
    id: 'Security',
    name: 'Security & Audits',
    count: 1,
    icon: Shield,
    badgeClass: 'badge-amber',
    description: 'Formal verification, circuit auditing, threat modeling, vulnerability research, and security advisories.'
  },
  {
    id: 'AI',
    name: 'AI & Biometrics',
    count: 1,
    icon: Brain,
    badgeClass: 'badge-purple',
    description: 'Neural feature extraction, homomorphic encryption, privacy-preserving machine learning.'
  },
  {
    id: 'Engineering',
    name: 'Enterprise',
    count: 1,
    icon: Building,
    badgeClass: 'badge-amber',
    description: 'SAML/OIDC bridges, enterprise directory identity, AWS/Azure IAM integration, and W3C DIDs.'
  }
];
