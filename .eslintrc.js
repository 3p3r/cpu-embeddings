// Legacy config for ESLint < 9.0.0 compatibility
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module"
  },
  plugins: ["@typescript-eslint"],
  env: {
    node: true,
    es6: true
  },
  ignorePatterns: ["dist/", "node_modules/", "coverage/", "*.js"],
  rules: {
    // Enforce semicolons
    "semi": ["error", "always"],
    
    // Enforce double quotes
    "quotes": ["error", "double"],
    
    // Enforce 2-space indentation
    "indent": ["error", 2],
    
    // Additional formatting rules
    "comma-dangle": ["error", "never"],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "space-before-function-paren": ["error", "never"],
    "keyword-spacing": ["error", { "before": true, "after": true }],
    "space-infix-ops": "error",
    "eol-last": ["error", "always"],
    "no-trailing-spaces": "error",
    
    // Basic TypeScript rules
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "warn"
  }
};