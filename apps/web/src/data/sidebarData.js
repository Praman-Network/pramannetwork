export const sidebarData = {
  popularTags: [
    'zk-SNARKs', 'Groth16', 'WebAuthn', 'Passkeys', 'Circom',
    'Sybil Resistance', 'zk-Rollups', 'Formal Verification',
    'Homomorphic Encryption', 'Enterprise DID', 'Next.js', 'WASM'
  ],
  securityAdvisories: [
    {
      id: 'PRM-2026-003',
      title: 'Circom Poseidon Hash Constraint Check',
      status: 'PASSED',
      statusVariant: 'green',
      date: '2026-07-20'
    },
    {
      id: 'PRM-2026-002',
      title: 'WebAuthn Challenge Replay Audit',
      status: 'VERIFIED',
      statusVariant: 'green',
      date: '2026-07-04'
    },
    {
      id: 'PRM-2026-001',
      title: 'BN254 Curve Pairing Verification',
      status: 'PASSED',
      statusVariant: 'green',
      date: '2026-06-15'
    }
  ],
  developerResources: [
    {
      title: 'Praman SDK Reference',
      url: 'https://docs.praman.network/sdk',
      description: 'npm @praman/sdk & @praman/react API docs'
    },
    {
      title: 'GitHub Organization',
      url: 'https://github.com/Praman-Network',
      description: 'Open-source Circom circuits & SDKs'
    },
    {
      title: 'Circom Circuit Specs',
      url: 'https://docs.praman.network/circuits',
      description: 'R1CS constraint formulas & proving benchmarks'
    },
    {
      title: 'Zero-Knowledge Explorer',
      url: 'https://explorer.praman.network',
      description: 'Verify live rollup batch proof hashes'
    }
  ],
  upcomingMilestones: [
    {
      version: 'v1.5.0',
      name: 'Starknet & Cairo Verifier Bridge',
      target: 'Q3 2026',
      completed: false
    },
    {
      version: 'v1.4.2',
      name: 'Recursive Batch Verification',
      target: 'Jul 2026',
      completed: true
    },
    {
      version: 'v1.4.0',
      name: 'Zero-Trust Passkey Identity Engine',
      target: 'Jun 2026',
      completed: true
    }
  ]
};
