import { type PropsWithChildren, type ReactElement } from 'react'

export default function MetadataWrapper ({ children }: PropsWithChildren): ReactElement {
  return (
    <div className="flex flex-col space-y-3 pt-4 text-slate-700 dark:text-slate-300 sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6 sm:space-y-0">
      {children}
    </div>
  )
}
