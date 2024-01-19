import { Fragment, type ReactElement, useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  BuildingOffice2Icon,
  CheckBadgeIcon,
  HomeIcon,
  Squares2X2Icon,
  UsersIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import ApplicationLogo from '@/Components/ApplicationLogo'
import classNames from '@/Utils/classNames'
import { type NavProps } from '@/types'

const navigation = [
  {
    name: 'Dashboard',
    href: route('admin.dashboards.main'),
    icon: Squares2X2Icon,
    components: ['Admin/Dashboards/Main']
  },
  {
    name: 'Housing',
    href: route('admin.housing.index'),
    icon: HomeIcon,
    components: ['Admin/Housing/Index', 'Admin/Housing/Create', 'Admin/Housing/Show', 'Admin/Housing/Edit']
  },
  {
    name: 'Businesses',
    href: route('admin.businesses.index'),
    icon: BuildingOffice2Icon,
    components: ['Admin/Businesses/Index']
  },
  {
    name: 'Claims',
    href: route('admin.claims.index'),
    icon: CheckBadgeIcon,
    components: ['Admin/Claims/Index', 'Admin/Claims/Show']
  },
  {
    name: 'Users',
    href: route('admin.users.index'),
    icon: UsersIcon,
    components: ['Admin/Users/Index', 'Admin/Users/Show']
  }
]

export default function AdminNav ({ user }: NavProps): ReactElement {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { component } = usePage()

  return <>
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900/80"/>
        </Transition.Child>

        <div className="fixed inset-0 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button type="button" className="-m-2.5 p-2.5" onClick={() => {
                    setSidebarOpen(false)
                  }}>
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true"/>
                  </button>
                </div>
              </Transition.Child>

              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-slate-50 px-6 pb-6 dark:bg-slate-900">
                <div className="flex h-16 shrink-0 items-center">
                  <ApplicationLogo className="block h-8 w-auto"/>
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item, index) => (
                          <li key={index}>
                            <Link
                              href={item.href}
                              className={classNames(
                                item.components.includes(component)
                                  ? 'bg-sky-700 text-white'
                                  : 'text-sky-700 dark:text-sky-200 hover:text-white hover:bg-sky-700/50 dark:hover:bg-sky-700/50',
                                'group flex gap-x-3 rounded-2xl px-3 py-2 text-sm leading-6 font-semibold'
                              )}
                            >
                              <item.icon
                                className={classNames(
                                  item.components.includes(component) ? 'text-white' : 'text-sky-700 dark:text-sky-200 group-hover:text-white',
                                  'h-6 w-6 shrink-0'
                                )}
                                aria-hidden="true"
                              />
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="mt-auto">
                      <Link
                        href={route('logout')}
                        method="post"
                        className="group -mx-2 flex gap-x-3 rounded-2xl px-3 py-2 text-sm font-semibold leading-6 text-sky-200 hover:bg-sky-700 hover:text-white"
                      >
                        <ArrowRightOnRectangleIcon
                          className="h-6 w-6 shrink-0 text-sky-200 group-hover:text-white"
                          aria-hidden="true"
                        />
                        Logout
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>

    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto px-8 pb-6">
        <div className="flex h-24 shrink-0 items-center">
          <ApplicationLogo className="h-8 w-auto"/>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className={classNames(
                        item.components.includes(component)
                          ? 'bg-sky-700 text-white'
                          : 'text-sky-700 dark:text-sky-200 hover:text-white hover:bg-sky-700/50 dark:hover:bg-sky-700/50',
                        'group flex gap-x-3 rounded-2xl px-3 py-2 text-sm leading-6 font-semibold'
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.components.includes(component) ? 'text-white' : 'text-sky-700 dark:text-sky-200 group-hover:text-white',
                          'h-6 w-6 shrink-0'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="mt-auto space-y-6">
              <Menu as="div" className="w-full">
                <Menu.Button
                  className="group -mx-2 flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-semibold leading-6 text-sky-700 hover:bg-sky-700/50 hover:text-white dark:text-sky-200 dark:hover:bg-sky-700/50"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="flex flex-1 items-center gap-x-3">
                    <img
                      className="h-6 w-6 shrink-0 rounded-full bg-slate-900"
                      src={user.profile_photo_url}
                      alt={user.name}
                    />
                    <span aria-hidden="true">
                      {user.name}
                    </span>
                  </div>
                  <ChevronRightIcon className="ml-auto h-5 w-5 text-slate-400 group-hover:text-white" aria-hidden="true"/>
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items
                    className="absolute -right-24 bottom-8 z-10 mt-2.5 w-32 origin-bottom-left rounded-2xl bg-white shadow-lg ring-1 ring-slate-900/5 focus:outline-none dark:bg-slate-800"
                  >
                    <div className="p-4 font-semibold">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href={route('profile.edit')}
                            className={classNames(
                              active ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300',
                              'block p-2 text-sm'
                            )}
                          >
                            Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href={route('logout')}
                            method="post"
                            className={classNames(
                              active ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300',
                              'block text-left p-2 text-sm'
                            )}
                          >
                            Log Out
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div className="lg:hidden">
      <div
        className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between gap-x-4 bg-transparent px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
      >
        <button
          type="button"
          className="-m-2.5 p-2.5 text-slate-300 lg:hidden"
          onClick={() => {
            setSidebarOpen(true)
          }}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
        </button>
        <Link href={route('profile.edit')}>
          <span className="sr-only">Your profile</span>
          <img
            className="h-8 w-8 rounded-full bg-indigo-700"
            src={user.profile_photo_url}
            alt={user.name}
          />
        </Link>
      </div>
    </div>
  </>
}
