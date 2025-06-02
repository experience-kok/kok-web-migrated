import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const textVariants = cva('', {
  variants: {
    size: {
      '4xl': 'text-4xl',
      '3xl': 'text-3xl',
      '2xl': 'text-2xl',
      xl: 'text-xl',
      lg: 'text-lg',
      md: 'text-base',
      sm: 'text-sm',
      xs: 'text-xs',
    },
    color: {
      primary: 'text-primary',
      foreground: 'text-foreground',
      muted: 'text-muted',
      'muted-foreground': 'text-muted-foreground',
      blue: 'text-blue-500',
      red: 'text-red-500',
      green: 'text-green-500',
      yellow: 'text-yellow-500',
      orange: 'text-orange-500',
      purple: 'text-purple-500',
      white: 'text-white',
    },
    weight: {
      thin: 'font-thin',
      extralight: 'font-extralight',
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
      black: 'font-black',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'foreground',
    weight: 'normal',
  },
});

type TextProps<T extends React.ElementType> = {
  as?: T;
} & React.PropsWithChildren &
  VariantProps<typeof textVariants>;

/**
 * 텍스트 컴포넌트
 * @param as 사용할 태그
 */
export const Text = <T extends React.ElementType = 'span'>({
  as,
  size,
  color,
  weight,
  className,
  children,
  ...props
}: TextProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof TextProps<T>>) => {
  const Element = as || 'span';

  return (
    <Element className={cn(textVariants({ size, color, weight }), className)} {...props}>
      {children}
    </Element>
  );
};
