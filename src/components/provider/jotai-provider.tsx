'use client';

import { PropsWithChildren } from 'react';

import { Provider } from 'jotai';

/**
 * jotai provider 컴포넌트
 */
export const JotaiProvider = ({ children }: PropsWithChildren) => {
  return <Provider>{children}</Provider>;
};
