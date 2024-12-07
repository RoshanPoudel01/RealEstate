import pluginJs from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx,jsx}"],
    rules: {
      // Treat unused variables as errors
      "no-unused-vars": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: false,
          varsIgnorePattern: "^_", // Optional: allow variables starting with _
          argsIgnorePattern: "^_",
        },
      ],

      // Block console.log completely
      "no-console": [
        "error",
        {
          allow: ["warn", "error"], // No console methods allowed
        },
      ],
    },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
