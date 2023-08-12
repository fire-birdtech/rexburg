import { ButtonHTMLAttributes } from 'react';
import { Link } from '@inertiajs/react';

export function PrimaryButton({
  className = '',
  href,
  disabled,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string
}) {
  const classes = `rounded-md bg-[#B3D9E6] px-3.5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm hover:bg-[#DBEDF3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:cursor-not-allowed disabled:bg-opacity-80 transition ease-in-out duration-150 ${disabled && 'opacity-25'} ${className}`;

  return href ? (
    <Link className={classes} href={href}>
      {children}
    </Link>
  ) : (
    <button {...props} className={classes}>
      {children}
    </button>
  );
}

export function SecondaryButton({
  className = '',
  href,
  disabled,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string
}) {
  const classes = `px-4 py-2 text-sm font-semibold leading-6 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition ease-in-out duration-150 ${disabled && 'opacity-25'} ${className}`;

  return href ? (
    <Link className={classes} href={href}>
      {children}
    </Link>
  ) : (
    <button {...props} className={classes}>
      {children}
    </button>
  );
}
