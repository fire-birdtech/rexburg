import classNames from '@/Utils/classNames'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { Link } from '@inertiajs/react'
import { Fragment, type ReactElement } from 'react'

export default function NavPopover ({
  links,
  name,
  show
}: { links: any[], name: string, show: boolean }): ReactElement {
  return (
    <Popover className={classNames(
      show ? 'block' : 'hidden',
      'relative'
    )}>
      <Popover.Button
        className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-sky-500 hover:text-sky-700 focus:outline-none dark:hover:text-sky-300">
        <span>{name}</span>
        <ChevronDownIcon className="h-3 w-3" aria-hidden="true"/>
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel
          className="absolute left-1/2 z-10 mt-4 flex w-screen max-w-max -translate-x-1/2 px-4">
          <div
            className="w-screen max-w-md flex-auto overflow-hidden rounded-2xl bg-slate-50 text-sm leading-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800">
            <div className="p-4">
              {links.map((link, index) => (
                <div key={index}
                     className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-slate-200 dark:hover:bg-slate-700">
                  <link.icon className="mt-1 h-10 w-10 flex-none" aria-hidden="true"/>
                  <div>
                    <Link href={link.href} className="font-semibold text-slate-800 dark:text-slate-100">
                      {link.name}
                      <span className="absolute inset-0"/>
                    </Link>
                    <p className="mt-1 text-slate-600 dark:text-slate-400">{link.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
