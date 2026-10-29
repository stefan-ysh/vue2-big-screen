module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  globals: {
    // echarts 4 以 CDN 全局变量的形式在 main.js 中挂载
    echarts: 'readonly'
  },
  rules: {
    // 允许 error/warn 用于错误路径日志，禁止调试用 log
    'no-console': ['warn', { allow: ['error', 'warn'] }],
    'no-debugger': 'warn',
    'vue/multi-word-component-names': 'off',
    // 项目大量使用无默认值对象 prop，按现状放开
    'vue/require-default-prop': 'off'
  }
}
