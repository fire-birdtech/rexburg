import { type PropsWithChildren, type ReactElement } from 'react'

export function Header2 ({ children }: PropsWithChildren): ReactElement {
  return (
    <h2 className="text-3xl text-slate-900 dark:text-slate-100">
      {children}
    </h2>
  )
}

export function Header3 ({ children }: PropsWithChildren): ReactElement {
  return (
    <h3 className="text-lg font-medium leading-6 text-slate-800 dark:text-slate-200">
      {children}
    </h3>
  )
}
