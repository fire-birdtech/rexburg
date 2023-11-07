import { type PropsWithChildren, type ReactElement } from 'react'
import { Link } from '@inertiajs/react'
import ApplicationLogo from '@/Components/ApplicationLogo'

export default function Guest ({ children }: PropsWithChildren): ReactElement {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center pt-6 sm:justify-center sm:pt-0">
      <div>
        <Link href="/">
          <ApplicationLogo className="h-10 w-auto md:h-16" />
        </Link>
      </div>

      <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md dark:bg-slate-800 sm:max-w-md sm:rounded-lg">
        {children}
      </div>
    </div>
  )
}
