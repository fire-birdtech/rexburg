import { LabelHTMLAttributes } from 'react';

export default function InputLabel({
  value,
  className = '',
  children,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement> & {
  value?: string,
}) {
  return (
    <label {...props} className={`block text-sm font-medium text-gray-300 ${className}`}>
      {value || children}
    </label>
  );
}