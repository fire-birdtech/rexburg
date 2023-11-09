import ApplicationLogo from '@/Components/ApplicationLogo'
import { Icon } from '@/Components/Icon'
import NavPopover from '@/Components/NavPopover'
import { type NavProps } from '@/types'
import classNames from '@/Utils/classNames'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { Link, usePage } from '@inertiajs/react'
import { Fragment, type ReactElement, useState } from 'react'
import NavLink from '@/Components/NavLink'

export default function MainNav ({ user }: NavProps): ReactElement {
  const { hasBusinessesAccess } = usePage().props.flags
  const navigation = [
    {
      name: 'Housing',
      show: true,
      links: [
        {
          name: 'Single Housing',
          href: route('housing.single'),
          icon: (props: any) => <Icon icon="student" {...props}/>,
          description: 'Find BYU-I approved housing for single students. You can get private rooms or apartments ranging from 4-8 people.'
        },
        {
          name: 'Married Housing',
          href: route('housing.married'),
          icon: (props: any) => <Icon icon="students" {...props}/>,
          description: 'Married housing is crucial, but difficult to find. We\'re making it easier. You can find different sizes and amenities.'
        }
      ]
    },
    { name: 'Businesses', show: hasBusinessesAccess, href: route('businesses.index') }
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

      {/* Desktop Navigation */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 lg:py-10" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link className="-m-1.5 p-1.5" href={dashboardLink()}>
            <span className="sr-only">RexburgGuru</span>
            <ApplicationLogo className="h-6 w-auto"/>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            onClick={() => {
              setMobileMenuOpen(true)
            }}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-sky-700 dark:text-slate-200"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => <>
            {item.links !== undefined ? (
              <NavPopover links={item.links} name={item.name} show={item.show}/>
            ) : (
              <NavLink href={item.href} name={item.name} show={item.show}/>
            )}
          </>)}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
          {user !== null ? (
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button
                  className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-sky-500 hover:text-sky-700 dark:hover:text-sky-300">
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
              <Link href={route('login')}
                className="text-sm font-semibold leading-6 text-sky-500 hover:text-sky-700 dark:hover:text-sky-300"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50"/>
        <Dialog.Panel
          className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-slate-50 p-6 dark:bg-slate-900 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link className="-m-1.5 p-1.5" href={user !== null ? route('dashboard') : route('welcome')}>
              <span className="sr-only">RexburgGuru</span>
              <ApplicationLogo className="h-6 w-auto"/>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-sky-700 dark:text-slate-200"
              onClick={() => {
                setMobileMenuOpen(false)
              }}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-slate-800/10 dark:divide-slate-200/10">
              <div className="space-y-2 py-6">
                {mobileNavigation.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-600 dark:text-slate-400"
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
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-slate-600 dark:text-slate-400"
                    >
                      Profile
                    </Link>
                    <Link
                      href={route('logout')}
                      as="button"
                      method="post"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-slate-600 dark:text-slate-400"
                    >
                      Log out
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href={route('login')}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-slate-600 dark:text-slate-400"
                    >
                      Log in
                    </Link>
                    <Link
                      href={route('register')}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-slate-600 dark:text-slate-400"
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
