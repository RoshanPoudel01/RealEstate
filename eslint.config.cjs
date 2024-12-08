module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "standard-with-typescript",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb-typescript",
    "prettier",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    project: "./tsconfig.json",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react", "@typescript-eslint"],
  files: ["**/*.ts"],
  rules: {
    "@typescript-eslint/no-unused-vars": "error",
    "no-console": "off",
    "import/first": "error",
    "react/prop-types": 0,
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/ban-ts-comment": 2,
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-shadow": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/triple-slash-reference": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/consistent-type-imports": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/unbound-method": "off",
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/consistent-indexed-object-style": "off",
    "@typescript-eslint/no-confusing-void-expression": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "no-template-curly-in-string": "off",
    "import/no-extraneous-dependencies": "off",
  },
  settings: {
    react: {
      version: "detect", // Automatically detect the React version
    },
  },
};
