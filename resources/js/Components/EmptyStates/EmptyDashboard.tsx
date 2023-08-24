import { useState } from 'react';
import {
  ChevronDownIcon, ChevronRightIcon, HomeModernIcon, UserIcon, UsersIcon,
} from '@heroicons/react/24/solid';
import { Link } from '@inertiajs/react';

const actions = [
  {
    name: 'Find single student housing',
    description: 'Private and shared rooms available.',
    href: route('housing.single'),
    icon: UserIcon,
  },
  {
    name: 'Find married student housing',
    description: 'Space for the two of you plus any extras.',
    href: route('housing.married'),
    icon: UsersIcon,
  },
];

const otherActions = [
  {
    name: 'Manage a student housing profile',
    description: 'Etiam sollicitudin augue sed nunc luctus tincidunt.',
    href: '#',
    icon: HomeModernIcon,
  },
];

export default function EmptyDashboard() {
  const [showOtherActions, setShowOtherActions] = useState(false);

  return (
    <div className="mx-auto max-w-lg px-4">
      <h2 className="text-xl font-semibold leading-6 text-slate-100 md:text-3xl">Welcome to RexburgGuru!</h2>
      <p className="mt-2 text-sm text-slate-500">Get started by selecting what you want to do.</p>
      <ul role="list" className="mt-6 space-y-3">
        {actions.map((action, actionIdx) => (
          <li key={actionIdx}>
            <div className="group relative flex items-start space-x-3 rounded-2xl bg-slate-800/50 p-4 hover:bg-slate-800/80">
              <div className="shrink-0">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-600">
                  <action.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-slate-200">
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
                <ChevronRightIcon className="h-5 w-5 text-slate-400 group-hover:text-white" aria-hidden="true" />
              </div>
            </div>
          </li>
        ))}
      </ul>
      {showOtherActions ? (
        <ul role="list" className="mt-3 space-y-3">
          {otherActions.map((action, actionIdx) => (
            <li key={actionIdx}>
              <div className="group relative flex items-start space-x-3 rounded-2xl bg-slate-800/50 p-4 hover:bg-slate-800/80">
                <div className="shrink-0">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-600">
                    <action.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-slate-200">
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
                  <ChevronRightIcon className="h-5 w-5 text-slate-400 group-hover:text-white" aria-hidden="true" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-3 flex justify-center">
          <button onClick={() => setShowOtherActions(true)} className="flex flex-col items-center rounded-2xl bg-slate-800/30 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800/40">
            Other actions
            <ChevronDownIcon className="h-3 w-3 text-slate-200" />
          </button>
        </div>
      )}
    </div>
  );
}
