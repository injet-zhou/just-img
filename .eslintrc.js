module.exports = {
  env: {
    browser: true,
    es2021: true,
    'vue/setup-compiler-macros': true,
  },
  extends: ['plugin:vue/essential', 'standard', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  globals: {
    defineProps: true,
    defineEmits: true,
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: { 'vue/multi-word-component-names': 0 },
}
