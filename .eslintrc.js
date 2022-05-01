module.exports = {
  extends: [
    "next/core-web-vitals",
    "plugin:import/recommended",
    "plugin:import/warnings",
    "prettier"
  ],
  rules: {
    "prettier/prettier": "error",
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2015,
  },
  rules: {
    'no-console': 'warn',
    'react/react-in-jsx-scope': 'off',
  },
};
