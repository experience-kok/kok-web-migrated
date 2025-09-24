import * as React from 'react';

import { cn } from '@/lib/utils';

interface FloatingInputProps extends Omit<React.ComponentProps<'input'>, 'placeholder'> {
  label: string;
  className?: string;
}

function FloatingInput({ className, type = 'text', label, ...props }: FloatingInputProps) {
  return (
    <div className="relative w-full">
      <input
        type={type}
        placeholder=" "
        data-slot="input"
        className={cn(
          'peer ck-sub-title-1 w-full bg-transparent px-0 pt-4 pb-1 transition-colors outline-none',
          'border-ck-gray-300 border-0 border-b border-solid',
          'focus:border-ck-blue-500 focus:border-b-2',
          'autofill:bg-transparent autofill:shadow-[inset_0_0_0px_1000px_transparent] disabled:cursor-not-allowed disabled:opacity-50',
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

export { FloatingInput };
