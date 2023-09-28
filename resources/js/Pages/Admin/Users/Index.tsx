import { type ReactElement } from 'react'
import { Head, Link } from '@inertiajs/react'
import Admin from '@/Layouts/AdminLayout'
import { convertDate } from '@/Utils/convertDate'
import { type PageProps, type User } from '@/types'

export default function UserIndex ({ auth, users }: PageProps<{ users: User[] }>): ReactElement {
  return (
    <Admin
      user={auth.user}
    >
      <Head title="Admin Users" />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-slate-800 dark:text-slate-200">
              Users
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              A list of all users including their name and email.
            </p>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden ring-1 ring-black/5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-slate-300 dark:divide-slate-700">
                  <thead className="bg-slate-200/60 dark:bg-slate-800/60">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300 sm:pl-6">
                        Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Email
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Created
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">View</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-300 bg-white dark:divide-slate-700 dark:bg-slate-800">
                    {users.map((user) => (
                      <tr key={user.email}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-slate-700 dark:text-slate-300 sm:pl-6">
                          {user.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-600 dark:text-slate-400">{user.email}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-600 dark:text-slate-400">{convertDate(user.created_at)}</td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <Link href={route('admin.users.show', [user.id])} className="text-sky-600 hover:text-sky-500">
                            View<span className="sr-only">, {user.name}</span>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Admin>
  )
}
