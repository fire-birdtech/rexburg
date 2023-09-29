import { type LabelHTMLAttributes, type ReactElement } from 'react'

export default function InputLabel ({
  value,
  className = '',
  children,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement> & {
  value?: string
}): ReactElement {
  return (
    <label {...props} className={`block text-sm font-medium text-slate-700 dark:text-slate-300 ${className}`}>
      {value ?? children}
    </label>
  )
}
