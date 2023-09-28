import { type ReactElement } from 'react'
import { Head, Link } from '@inertiajs/react'
import MainNav from '@/Components/MainNav'
import { type PageProps } from '@/types'

export default function Error404 ({ auth }: PageProps): ReactElement {
  return <>
    <Head title="Page not found"/>

    <div className="bg-slate-900 bg-dots-lighter selection:bg-sky-500 selection:text-white">
      <MainNav user={auth.user}/>

      <main className="py-20">
        <div className="flex min-h-full flex-col pb-12 pt-32">
          <div className="mx-auto flex w-full max-w-7xl grow flex-col justify-center px-4 sm:px-6 lg:px-8">
            <div className="py-16">
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-wide text-sky-600">
                  404 error
                </p>
                <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-100 sm:text-5xl">
                  Page not found.
                </h1>
                <p className="mt-2 text-base text-slate-500">
                  Sorry, we couldn&apos;t find the page you&apos;re looking for.
                </p>
                <div className="mt-6 flex flex-col space-y-4">
                  <Link href={route('housing.single')}
                    className="text-base font-medium text-sky-600 hover:text-sky-700"
                  >
                    Go to single housing listings <span aria-hidden="true"> &rarr;</span>
                  </Link>
                  <Link href={route('housing.married')}
                    className="text-base font-medium text-sky-600 hover:text-sky-700"
                  >
                    Go to married housing listings <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </>
}
