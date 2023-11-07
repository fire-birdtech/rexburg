import classNames from '@/Utils/classNames'
import { type ButtonHTMLAttributes, type ReactElement } from 'react'
import { Link } from '@inertiajs/react'

export function PrimaryButton ({
  className = '',
  href,
  disabled,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string
}): ReactElement {
  const classes = classNames(
    'rounded-xl bg-sky-300 px-3.5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm hover:bg-sky-400 dark:hover:bg-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 transition ease-in-out duration-150',
    disabled === true ? 'opacity-25 cursor-not-allowed' : '',
    className
  )

  return href !== undefined ? (
    <Link className={classes} href={href}>
      {children}
    </Link>
  ) : (
    <button {...props} className={classes}>
      {children}
    </button>
  )
}

export function SecondaryButton ({
  className = '',
  href,
  disabled,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string
}): ReactElement {
  const classes = `px-4 py-2 text-sm font-semibold leading-6 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition ease-in-out duration-150 ${disabled === true && 'opacity-25'} ${className}`

  return href !== undefined ? (
    <Link className={classes} href={href}>
      {children}
    </Link>
  ) : (
    <button {...props} className={classes}>
      {children}
    </button>
  )
}

export function DangerButton ({
  className = '',
  disabled,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>): ReactElement {
  return (
    <button
      {...props}
      className={classNames(
        'rounded-xl bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-red-50 shadow-sm transition duration-150 ease-in-out hover:bg-red-500/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:cursor-not-allowed',
        disabled === true ? 'opacity-25' : '',
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
