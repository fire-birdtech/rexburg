import { Icon } from '@/Components/Icon'
import { type ReactElement } from 'react'
import { Link } from '@inertiajs/react'
import { ChevronRightIcon } from '@heroicons/react/24/solid'

interface Action {
  name: string
  description: string
  href: string
  icon: string
}

export default function EmptyDashboardAction ({ action }: { action: Action }): ReactElement {
  return (
    <li>
      <div className="group relative flex items-start space-x-3 rounded-2xl bg-slate-200/50 p-4 hover:bg-slate-200/80 dark:bg-slate-800/50 dark:hover:bg-slate-800/80">
        <div className="shrink-0">
          <Icon icon={action.icon} className="h-10 w-10 text-white" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium text-slate-800 dark:text-slate-200">
            <Link href={action.href}>
              <span className="absolute inset-0" aria-hidden="true" />
              {action.name}
            </Link>
          </div>
          <p className="text-sm text-slate-500">
            {action.description}
          </p>
        </div>
        <div className="shrink-0 self-center">
          <ChevronRightIcon className="h-5 w-5 text-slate-600 group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-white" aria-hidden="true" />
        </div>
      </div>
    </li>
  )
}
