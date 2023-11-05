import { Fragment, type ReactElement, useState } from 'react'
import { Link } from '@inertiajs/react'
import {
  Dialog, Menu, Popover, Transition
} from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import {
  ChevronDownIcon, UserIcon, UsersIcon, XMarkIcon
} from '@heroicons/react/24/solid'
import ApplicationLogo from '@/Components/ApplicationLogo'
import classNames from '@/Utils/classNames'
import { type NavProps } from '@/types'

const navigation = [
  {
    name: 'Housing',
    links: [
      {
        name: 'Single Housing',
        href: route('housing.single'),
        icon: UserIcon,
        description: 'Find BYU-I approved housing for single students. You can get private rooms or apartments ranging from 4-8 people.'
      },
      {
        name: 'Married Housing',
        href: route('housing.married'),
        icon: UsersIcon,
        description: 'Married housing is crucial, but difficult to find. We\'re making it easier. You can find different sizes and amenities.'
      }
    ]
  }
  //   { name: 'Businesses', href: '#' },
  //   { name: 'Jobs', href: '#' },
  //   { name: 'Rides', href: '#' },
  //   { name: 'Activities', href: '#' },
]

const mobileNavigation = [
  {
    name: 'Single Housing',
    href: route('housing.single')
  },
  {
    name: 'Married Housing',
    href: route('housing.married')
  }
]

export default function MainNav ({ user }: NavProps): ReactElement {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const dashboardLink = (): string => {
    const isManager = user?.roles.map((role: { name: string }) => role.name)
      .indexOf('manager')
    const isAdmin = user?.roles.map((role: { name: string }) => role.name)
      .indexOf('admin')

    if (user !== null) {
      if (isManager !== -1) {
        return route('manager.dashboard')
      }
      if (isAdmin !== -1) {
        return route('admin.dashboards.main')
      }
      return route('dashboard')
    }

    return route('welcome')
  }

  return (
    <header className="absolute inset-x-0 top-0 z-10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 lg:py-10" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link className="-m-1.5 p-1.5" href={dashboardLink()}>
            <span className="sr-only">RexburgGuru</span>
            <ApplicationLogo className="h-6 w-auto"/>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button onClick={() => { setMobileMenuOpen(true) }}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-sky-700 dark:text-slate-200"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            // <Link href={item.href} key={item.name} className="text-sm font-semibold leading-6 text-slate-400 hover:text-white">
            //   {item.name}
            // </Link>
            <Popover key={item.name} className="relative">
              <Popover.Button
                className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-sky-500 hover:text-sky-700 focus:outline-none dark:hover:text-sky-300">
                <span>{item.name}</span>
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
                <Popover.Panel className="absolute left-1/2 z-10 mt-4 flex w-screen max-w-max -translate-x-1/2 px-4">
                  <div
                    className="w-screen max-w-md flex-auto overflow-hidden rounded-2xl bg-slate-50 text-sm leading-6 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800">
                    <div className="p-4">
                      {item.links.map((link, index) => (
                        <div key={index} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-slate-200 dark:hover:bg-slate-700">
                          <div
                            className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-slate-300 group-hover:bg-slate-400 dark:bg-slate-600 dark:group-hover:bg-slate-500"
                          >
                            <link.icon className="h-6 w-6 text-slate-700 group-hover:text-slate-800 dark:text-slate-300 dark:group-hover:text-slate-200" aria-hidden="true"/>
                          </div>
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
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
          {user !== null ? (
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button
                  className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white">
                  <span className="sr-only">Open menu</span>
                  {user.name}
                  <ChevronDownIcon className="-mr-0.5 h-3 w-3"/>
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Menu.Items
                  className="absolute right-0 z-10 mt-4 w-48 origin-top-right rounded-2xl bg-slate-50 shadow-lg ring-1 ring-slate-900/5 focus:outline-none dark:bg-slate-800">
                  <div className="p-4 font-semibold">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href={route('profile.edit')}
                          className={classNames(
                            active ? 'text-slate-950 dark:text-white' : 'text-slate-600 dark:text-slate-300',
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
                          as="button"
                          className={classNames(
                            active ? 'text-slate-950 dark:text-white' : 'text-slate-600 dark:text-slate-300',
                            'block w-full text-left p-2 text-sm'
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
          ) : (
            <>
              <Link href={route('register')}
                className="rounded-xl bg-sky-300 px-3.5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 dark:hover:bg-sky-200"
              >
                Register
              </Link>
              <Link href={route('login')} className="text-sm font-semibold leading-6 text-sky-500 hover:text-sky-700 dark:hover:text-sky-300">
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            </>
          )}
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50"/>
        <Dialog.Panel
          className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-slate-800 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link className="-m-1.5 p-1.5" href={user !== null ? route('dashboard') : route('welcome')}>
              <span className="sr-only">RexburgGuru</span>
              <ApplicationLogo className="h-6 w-auto"/>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-slate-200"
              onClick={() => { setMobileMenuOpen(false) }}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-slate-200/10">
              <div className="space-y-2 py-6">
                {mobileNavigation.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-400 hover:bg-slate-700"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                {user !== null ? (
                  <>
                    <Link
                      href={route('profile.edit')}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-slate-400 hover:bg-slate-700"
                    >
                      Profile
                    </Link>
                    <Link
                      href={route('logout')}
                      as="button"
                      method="post"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-slate-400 hover:bg-slate-700"
                    >
                      Log out
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href={route('login')}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-slate-400 hover:bg-slate-700"
                    >
                      Log in
                    </Link>
                    <Link
                      href={route('register')}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-slate-400 hover:bg-slate-700"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
