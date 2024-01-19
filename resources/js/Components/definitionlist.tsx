import { type PropsWithChildren, type ReactElement } from 'react'

interface DefinitionListItemProps {
  term: string
  definition: string
  cols?: number
}

export function DefinitionList ({ children }: PropsWithChildren): ReactElement {
  return (
    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
      {children}
    </dl>
  )
}

export function DefinitionListItem ({ term, definition, cols = 1 }: DefinitionListItemProps): ReactElement {
  const columns: Record<number, string> = {
    1: 'sm:col-span-1',
    2: 'sm:col-span-2'
  }

  return (
    <div className={columns[cols]}>
      <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">
        {term}
      </dt>
      <dd className="mt-1 text-sm text-slate-800 dark:text-slate-200">
        {definition}
      </dd>
    </div>
  )
}
