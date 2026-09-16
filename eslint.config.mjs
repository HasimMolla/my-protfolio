import coreWebVitals from "eslint-config-next/core-web-vitals";

// eslint-config-next v16 ships flat configs directly, so the old
// FlatCompat + `extends("next/core-web-vitals")` shim is no longer needed.
const eslintConfig = [
  {
    ignores: [".next/**", "out/**", "build/**", "node_modules/**"],
  },
  ...coreWebVitals,
];

export default eslintConfig;
