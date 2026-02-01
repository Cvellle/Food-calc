import {ButtonHTMLAttributes} from 'react';

export function Button({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="
        w-full rounded-lg bg-red-600 py-2 font-semibold text-white
        hover:bg-red-700 transition
        disabled:opacity-50
      "
    >
      {children}
    </button>
  );
}
