import js from "@eslint/js";
import next from "@next/eslint-plugin-next";
import stylistic from "@stylistic/eslint-plugin";
import {defineConfig, globalIgnores} from "eslint/config";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-plugin-prettier/recommended";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores([
    "**/coverage/**",
    "**/.idea/**",
    "**/.next/**",
    "**/.next-e2e/**",
    "playwright-report/**",
    "test-results/**",
    "**/.vscode/**",
    "**/build/**",
    "out/**",
    "scripts/**",
    ".agents/**",
    ".claude/**",
    "next-env.d.ts",
  ]),
  {
    files: ["**/*.{js,cjs,mjs,ts,mts,tsx}"],
    extends: [js.configs.recommended],
    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
    plugins: importPlugin.flatConfigs.typescript.plugins,
    settings: {
      "import/resolver": {
        typescript: {
          project: `${import.meta.dirname}/tsconfig.json`,
        },
      },
    },
    rules: {
      "no-console": "warn",
      "import/order": [
        "warn",
        {
          groups: [
            "type",
            "builtin",
            "object",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroups: [
            {pattern: "~/**/types", group: "type", position: "before"},
            {pattern: "~/**", group: "external", position: "after"},
          ],
          "newlines-between": "always",
        },
      ],
    },
  },
  {
    files: ["*.{js,cjs,mjs,ts,mts}", "tests/**/*.{ts,mjs}"],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ["*.config.js"],
    languageOptions: {
      sourceType: "commonjs",
    },
  },
  {
    files: ["**/*.{ts,mts,tsx}"],
    extends: [
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      importPlugin.flatConfigs.typescript,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Preserve the project's type-safety exceptions and style-guide customizations.
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/prefer-promise-reject-errors": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/prefer-nullish-coalescing": "off",
      "@typescript-eslint/no-unused-vars": ["warn", {argsIgnorePattern: "^_"}],
      "@typescript-eslint/consistent-type-exports": [
        "warn",
        {fixMixedExportsWithInlineTypeSpecifier: true},
      ],
      "@typescript-eslint/consistent-type-imports": "warn",
      "@typescript-eslint/method-signature-style": "warn",
      "@typescript-eslint/naming-convention": [
        "error",
        {format: ["PascalCase"], selector: ["typeLike", "enumMember"]},
        {
          custom: {match: false, regex: "^I[A-Z]|^(Interface|Props|State)$"},
          format: ["PascalCase"],
          selector: "interface",
        },
      ],
      "@typescript-eslint/no-redundant-type-constituents": "warn",
      "@typescript-eslint/no-unnecessary-qualifier": "warn",
      "@typescript-eslint/prefer-regexp-exec": "warn",
      "@typescript-eslint/require-array-sort-compare": ["error", {ignoreStringArrays: true}],
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      "@typescript-eslint/default-param-last": "error",
      "no-loop-func": "error",
    },
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [
      react.configs.flat.recommended,
      react.configs.flat["jsx-runtime"],
      reactHooks.configs.flat.recommended,
      jsxA11y.flatConfigs.recommended,
      next.configs.recommended,
    ],
    languageOptions: {
      globals: {...globals.browser, ...globals.node},
    },
    settings: {
      react: {version: "detect"},
    },
    rules: {
      "react/prop-types": "off",
      "react/button-has-type": "warn",
      "react/function-component-definition": "warn",
      "react/hook-use-state": "warn",
      "react/jsx-boolean-value": "warn",
      "react/jsx-curly-brace-presence": "warn",
      "react/jsx-fragments": "warn",
      "react/jsx-no-leaked-render": ["warn", {validStrategies: ["coerce"]}],
      "react/jsx-no-target-blank": ["error", {allowReferrer: true}],
      "react/jsx-no-useless-fragment": ["warn", {allowExpressions: true}],
      "react/jsx-pascal-case": "warn",
      "react/no-unstable-nested-components": "error",
      "react/self-closing-comp": "warn",
      "react/jsx-sort-props": [
        "warn",
        {
          callbacksLast: true,
          shorthandFirst: true,
          reservedFirst: true,
        },
      ],
      // Product images use external URLs supplied by the store's spreadsheet.
      "@next/next/no-img-element": "off",
    },
  },
  {
    files: ["src/components/ui/alert.tsx"],
    rules: {
      // AlertTitle forwards its children through a props spread to the heading.
      "jsx-a11y/heading-has-content": "off",
    },
  },
  // Prettier owns formatting; keep the intentional blank-line policy below it.
  {
    extends: [prettier],
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      "prettier/prettier": [
        "warn",
        {
          printWidth: 100,
          bracketSpacing: false,
          endOfLine: "auto",
          plugins: ["prettier-plugin-tailwindcss"],
          tailwindStylesheet: "./src/app/globals.css",
        },
      ],
      "@stylistic/padding-line-between-statements": [
        "warn",
        {blankLine: "always", prev: "*", next: ["return", "export"]},
        {blankLine: "always", prev: ["const", "let", "var"], next: "*"},
        {blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"]},
      ],
    },
  },
]);
