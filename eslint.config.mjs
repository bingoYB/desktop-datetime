import { defineConfig } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    files: [
      "components/Weather/**/*.{js,jsx,ts,tsx}",
      "app/weather-preview/page.tsx",
    ],
    rules: {
      // Legacy visual-effects modules rely on mutable refs and random generation.
      "react-hooks/immutability": "off",
      "react-hooks/purity": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "prefer-const": "off",
      "no-var": "off",
    },
  },
]);
