import { Fragment, useState } from 'react';
import { Link } from '@inertiajs/react';
import { Menu, Transition } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import ApplicationLogo from '@/Components/ApplicationLogo';
import classNames from '@/Utils/classNames';
import { User } from '@/types';

type NavProps = {
  user: User;
}

const navigation = [
  { name: 'Housing', href: '#' },
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
            <Link href={item.href} key={item.name} className="text-sm font-semibold leading-6 text-slate-400 hover:text-white">
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
          {user ? (
            // <Link href={route('dashboard')} className="text-sm font-semibold leading-6 text-slate-400 hover:text-white">
            //   Dashboard <span aria-hidden="true">&rarr;</span>
            // </Link>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex items-center text-sm font-semibold leading-6 text-slate-400 hover:text-white">
                  <span className="sr-only">Open menu</span>
                  {user.name}
                  <ChevronDownIcon className="ml-2 -mr-0.5 h-4 w-4" />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-slate-800 shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href={route('profile.edit')}
                          className={classNames(
                            active ? 'bg-slate-700 text-white' : 'text-slate-300',
                            'block px-4 py-2 text-sm',
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
                            active ? 'bg-slate-700 text-white' : 'text-slate-300',
                            'block w-full text-left px-4 py-2 text-sm',
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
