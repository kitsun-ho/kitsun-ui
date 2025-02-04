export default {
  extends: [
    'stylelint-config-standard', // 基本標準配置
    'stylelint-config-standard-vue', // Vue 標準配置
    'stylelint-config-rational-order', // 合理的 CSS 排序規則
  ],
  plugins: ['stylelint-order'], // 用於屬性排序
  rules: {
    'custom-property-empty-line-before': 'never',
    'import-notation': 'string',
    'selector-class-pattern': null,
    'no-descending-specificity': null,
  },
};
