import { type PropsWithChildren, type ReactElement } from 'react'

export function Header2 ({ children }: PropsWithChildren): ReactElement {
  return (
    <h2 className="text-3xl text-slate-900 dark:text-slate-100">
      {children}
    </h2>
  )
}
