import { Fragment, useState } from 'react';
import { Link } from '@inertiajs/react';
import { Menu, Popover, Transition } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, UserIcon, UsersIcon } from '@heroicons/react/24/solid';
import ApplicationLogo from '@/Components/ApplicationLogo';
import classNames from '@/Utils/classNames';
import { User } from '@/types';

type NavProps = {
  user: User;
}

const navigation = [
  {
    name: 'Housing',
    links: [
      {
        name: 'Single Housing',
        href: route('housing.single'),
        icon: UserIcon,
        description: 'Find BYU-I approved housing for single students. You can get private rooms or apartments ranging from 4-8 people.',
      },
      {
        name: 'Married Housing',
        href: route('housing.married'),
        icon: UsersIcon,
        description: 'Married housing is crucial, but difficult to find. We\'re making it easier. You can find different sizes and amenities.',
      },
    ],
  },
  //   { name: 'Businesses', href: '#' },
  //   { name: 'Jobs', href: '#' },
  //   { name: 'Rides', href: '#' },
  //   { name: 'Activities', href: '#' },
];

export default function MainNav({ user }: NavProps) {
  const [, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 lg:py-10" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link className="-m-1.5 p-1.5" href="#">
            <span className="sr-only">RexburgGuru</span>
            <ApplicationLogo className="h-6 w-auto" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button onClick={() => setMobileMenuOpen(true)} className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            // <Link href={item.href} key={item.name} className="text-sm font-semibold leading-6 text-slate-400 hover:text-white">
            //   {item.name}
            // </Link>
            <Popover key={item.name} className="relative">
              <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-slate-400 hover:text-white focus:outline-none">
                <span>{item.name}</span>
                <ChevronDownIcon className="h-3 w-3" aria-hidden="true" />
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
                  <div className="w-screen max-w-md flex-auto overflow-hidden rounded-2xl bg-slate-800 text-sm leading-6 shadow-lg ring-1 ring-slate-900/5">
                    <div className="p-4">
                      {item.links.map((link, index) => (
                        <div key={index} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-slate-700">
                          <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-slate-600 group-hover:bg-slate-500">
                            <link.icon className="h-6 w-6 text-slate-300 group-hover:text-slate-200" aria-hidden="true" />
                          </div>
                          <div>
                            <Link href={link.href} className="font-semibold text-slate-100">
                              {link.name}
                              <span className="absolute inset-0" />
                            </Link>
                            <p className="mt-1 text-slate-400">{link.description}</p>
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
          {user ? (
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-slate-400 hover:text-white">
                  <span className="sr-only">Open menu</span>
                  {user.name}
                  <ChevronDownIcon className="-mr-0.5 h-3 w-3" />
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
                <Menu.Items className="absolute right-0 z-10 mt-4 w-48 origin-top-right rounded-2xl bg-slate-800 shadow-lg ring-1 ring-slate-900/5 focus:outline-none">
                  <div className="p-4 font-semibold">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href={route('profile.edit')}
                          className={classNames(
                            active ? 'text-white' : 'text-slate-300',
                            'block p-2 text-sm',
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
                            active ? 'text-white' : 'text-slate-300',
                            'block w-full text-left p-2 text-sm',
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
              <Link href={route('register')} className="rounded-md bg-[#B3D9E6] px-3.5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm hover:bg-[#DBEDF3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">
                Register
              </Link>
              <Link href={route('login')} className="text-sm font-semibold leading-6 text-slate-400 hover:text-white">
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
