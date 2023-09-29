import { type InputHTMLAttributes, type ReactElement } from 'react'

export default function Checkbox ({
  className = '',
  ...props
}: InputHTMLAttributes<HTMLInputElement>): ReactElement {
  return (
    <input
      {...props}
      type="checkbox"
      className={
        `rounded border-slate-700 bg-white text-slate-500 shadow-sm focus:ring-slate-500 focus:ring-offset-slate-800 dark:bg-slate-900 ${className}`
      }
    />
  )
}
