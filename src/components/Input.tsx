import {InputHTMLAttributes} from 'react';

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="
        w-full rounded-lg border border-gray-300 px-4 py-2
        focus:outline-none focus:ring-2 focus:ring-emerald-500
      "
    />
  );
}
