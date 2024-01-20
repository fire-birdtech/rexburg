import EmptyDashboardAction from '@/Components/EmptyStates/EmptyDashboardAction'
import { type ReactElement, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'

const actions = [
  {
    name: 'Find single student housing',
    description: 'Private and shared rooms available.',
    href: route('housing.single'),
    icon: 'student'
  },
  {
    name: 'Find married student housing',
    description: 'Space for the two of you plus any extras.',
    href: route('housing.married'),
    icon: 'students'
  }
]

const otherActions = [
  {
    name: 'Manage a student housing profile',
    description: 'Claim the profile for your student housing.',
    href: route('claims.index'),
    icon: 'home'
  },
  {
    name: 'Manage a business profile',
    description: 'Claim the profile for you business',
    href: route('claims.index'),
    icon: 'business'
  }
]

export default function EmptyDashboard (): ReactElement {
  const [showOtherActions, setShowOtherActions] = useState(false)

  return (
    <div className="mx-auto max-w-lg px-4">
      <h2 className="tex-slate-800 text-xl font-semibold leading-6 dark:text-slate-100 md:text-3xl">Welcome to RexburgGuru!</h2>
      <p className="mt-2 text-sm text-slate-500">Get started by selecting what you want to do.</p>
      <ul role="list" className="mt-6 space-y-3">
        {actions.map((action, actionIdx) => (
          <EmptyDashboardAction key={actionIdx} action={action}/>
        ))}
      </ul>
      {showOtherActions ? (
        <ul role="list" className="mt-3 space-y-3">
          {otherActions.map((action, actionIdx) => (
            <EmptyDashboardAction key={actionIdx} action={action}/>
          ))}
        </ul>
      ) : (
        <div className="group mt-3 flex justify-center">
          <button onClick={() => { setShowOtherActions(true) }} className="flex flex-col items-center rounded-2xl bg-slate-200/40 px-3 py-2 text-sm text-slate-800 group-hover:bg-slate-200/60 dark:bg-slate-800/40 dark:text-slate-200 dark:group-hover:bg-slate-800/60">
            Other actions
            <ChevronDownIcon className="h-3 w-3 text-slate-600 group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-white" />
          </button>
        </div>
      )}
    </div>
  )
}
