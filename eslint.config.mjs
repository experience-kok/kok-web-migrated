import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import pluginImport from 'eslint-plugin-import';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      import: pluginImport,
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    rules: {
      // import 순서 규칙
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'unknown'],
          pathGroups: [
            {
              pattern: 'react', // React 관련
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'next', // Next.js 관련
              group: 'external',
              position: 'after',
            },
            {
              pattern: 'next/font/google', // Next.js 폰트 관련
              group: 'external',
              position: 'after',
            },
            {
              pattern: '@/configs/**', // configs 폴더
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/hooks/**', // hooks 폴더
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/libs/**', // libs 폴더
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/services/**', // services 폴더
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/stores/**', // stores 폴더
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/types/**', // types 폴더
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/utils/**', // utils 폴더
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/constants/**', // constants 폴더
              group: 'internal',
              position: 'after',
            },
            {
              pattern: 'public/**', // public 폴더
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@tanstack/**', // @tanstack 관련 라이브러리
              group: 'internal',
              position: 'after', // 가장 마지막에 배치
            },
            {
              pattern: 'embla-carousel-autoplay', // embla-carousel-autoplay 라이브러리
              group: 'internal',
              position: 'after', // 가장 마지막에 배치
            },
          ],
          pathGroupsExcludedImportTypes: ['@tanstack', 'embla-carousel-autoplay'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
];

export default eslintConfig;
