import nextConfig from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextConfig,
  {
    rules: {
      // Disable overly strict rule that flags legitimate patterns for:
      // - Reading from localStorage in useEffect
      // - DOM measurements after mount
      // - Hydration-safe state initialization
      "react-hooks/set-state-in-effect": "off",
      // Disable overly strict purity rule that flags Date.now() in server components
      // where it's actually deterministic per request
      "react-hooks/purity": "off",
    },
  },
];

export default eslintConfig;