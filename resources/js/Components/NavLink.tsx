import classNames from '@/Utils/classNames'
import { Link } from '@inertiajs/react'
import { type ReactElement } from 'react'

export default function NavLink ({ href, name, show }: { href: string, name: string, show: boolean }): ReactElement {
  return (
    <Link href={href}
      className={classNames(
        show ? 'block' : 'hidden',
        'text-sm font-semibold leading-6 text-sky-500 hover:text-sky-700 focus:outline-none dark:hover:text-sky-300'
      )}
    >
      {name}
    </Link>
  )
}
