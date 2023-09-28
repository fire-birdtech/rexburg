import { Head, Link } from '@inertiajs/react';
import Admin from '@/Layouts/AdminLayout';
import { Claim, PageProps } from '@/types';

export default function ClaimIndex({ auth, claims }: PageProps & { claims: Claim[] }) {
  return (
    <Admin
      user={auth.user}
    >
      <Head title="Claims" />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-slate-800 dark:text-slate-200">
              Claims
            </h1>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden ring-1 ring-black/5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-slate-300 dark:divide-slate-700">
                  <thead className="bg-slate-200/60 dark:bg-slate-800/60">
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300 sm:pl-6">
                      Claimable Name
                    </th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300 sm:pl-6">
                      Claimed By
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Verification Code
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">View</span>
                    </th>
                  </thead>
                  <tbody className="divide-y divide-slate-300 bg-white dark:divide-slate-700 dark:bg-slate-800">
                    {claims.map((claim) => (
                      <tr key={claim.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-slate-700 dark:text-slate-300 sm:pl-6">
                          {claim.claimable.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-600 dark:text-slate-400">
                          {claim.user.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-600 dark:text-slate-400">
                          {claim.user.email}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-600 dark:text-slate-400">
                          {claim.status === 'claimed' || claim.status === 'approved' ? (
                            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-800 ring-1 ring-inset ring-green-600/20">
                              {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-600 dark:text-slate-400">
                          {claim.verification_code}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <Link href={route('admin.claims.show', [claim.id])} className="text-sky-600 hover:text-sky-500">
                            View<span className="sr-only">, {claim.claimable.name}</span>
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
  );
}
