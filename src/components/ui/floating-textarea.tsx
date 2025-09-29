import type * as React from 'react';

import { cn } from '@/lib/utils';

interface FloatingTextareaProps extends Omit<React.ComponentProps<'textarea'>, 'placeholder'> {
  label: string;
  className?: string;
}

function FloatingTextarea({ className, label, ...props }: FloatingTextareaProps) {
  return (
    <div className="ck-interactive-scale relative w-full">
      <textarea
        placeholder=" "
        data-slot="textarea"
        className={cn(
          'peer ck-body-1 w-full resize-y bg-transparent px-4 pt-5 pb-3 outline-none',
          'border-ck-gray-300 rounded-lg border-2',
          'transition-[border-color] duration-200',
          'focus:border-ck-blue-500',
          'hover:border-ck-gray-400',
          'disabled:hover:border-ck-gray-300 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />
      <label
        className={cn(
          'pointer-events-none absolute left-3 px-1 transition-all duration-200 ease-out',
          'text-ck-gray-500 dark:text-ck-gray-400',
          'top-5',
          'peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:scale-75',
          'peer-focus:text-ck-blue-500 dark:peer-focus:bg-ck-gray-900 peer-focus:bg-white',
          'peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:scale-75',
          'dark:peer-[:not(:placeholder-shown)]:bg-ck-gray-900 peer-[:not(:placeholder-shown)]:bg-white',
        )}
      >
        <span className="relative">{label}</span>
      </label>
    </div>
  );
}

export { FloatingTextarea };
