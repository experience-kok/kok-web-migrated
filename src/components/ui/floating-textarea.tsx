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
          'peer ck-sub-title-1 min-h-[80px] w-full resize-y bg-transparent px-0 pt-4 pb-1 transition-colors outline-none',
          'border-ck-gray-300 border-0 border-b-2 border-solid',
          'focus:border-ck-blue-500',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />
      <label
        className={cn(
          'pointer-events-none absolute top-4 left-0 origin-left transition-all duration-200 ease-out',
          'text-ck-gray-500 dark:text-ck-gray-400',
          'peer-focus:text-ck-blue-500 peer-focus:translate-y-[-1.5rem] peer-focus:scale-75',
          'peer-[:not(:placeholder-shown)]:translate-y-[-1.5rem] peer-[:not(:placeholder-shown)]:scale-75',
        )}
      >
        {label}
      </label>
    </div>
  );
}

export { FloatingTextarea };
