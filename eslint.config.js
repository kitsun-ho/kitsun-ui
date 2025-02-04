import process from 'process';
import antfu from '@antfu/eslint-config';

export default antfu({
  vue: {
    overrides: {
      'vue/operator-linebreak': ['error', 'before'],
    },
  },
  typescript: {
    overrides: {
      'ts/consistent-type-definitions': ['error', 'interface'],
      'ts/ban-ts-comment': 'off',
    },
  },
  rules: {
    'style/semi': ['error', 'always'],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'unicorn/prefer-node-protocol': 'off',
    'test/prefer-lowercase-title': 'off',
  },
});
