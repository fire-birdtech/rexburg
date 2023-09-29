import { type ReactElement } from 'react'

interface StatisticItemProps {
  name: string
  stat: string
}

export default function StatisticItem ({ name, stat }: StatisticItemProps): ReactElement {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 px-4 py-5 shadow dark:border-slate-600 dark:bg-slate-900 sm:p-6">
      <div className="truncate text-sm font-medium text-slate-600 dark:text-slate-400">
        {name}
      </div>
      <div className="mt-1 text-3xl font-semibold tracking-tight text-slate-800 dark:text-slate-200">
        {stat}
      </div>
    </div>
  )
}
