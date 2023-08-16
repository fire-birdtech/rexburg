import { InputHTMLAttributes } from 'react';

export default function Checkbox({
  className = '',
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      type="checkbox"
      className={
        `rounded border-slate-700 bg-slate-900 text-slate-500 shadow-sm focus:ring-slate-500 focus:ring-offset-slate-800 ${className}`
      }
    />
  );
}
