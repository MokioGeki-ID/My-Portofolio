import js from '@eslint/js';
import react from 'eslint-plugin-react';
const g = Object.fromEntries(['window', 'document', 'fetch', 'localStorage', 'matchMedia', 'IntersectionObserver', 'setTimeout', 'clearTimeout', 'requestAnimationFrame', 'cancelAnimationFrame'].map((k) => [k, 'readonly']));
export default [js.configs.recommended, {
  files: ['**/*.{js,jsx}'], plugins: { react },
  languageOptions: { ecmaVersion: 'latest', sourceType: 'module', globals: g, parserOptions: { ecmaFeatures: { jsx: true } } },
  rules: { 'react/jsx-uses-vars': 'error', 'react/jsx-uses-react': 'error' },
}];
