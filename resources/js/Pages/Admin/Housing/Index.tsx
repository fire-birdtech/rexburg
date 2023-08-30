import { PrimaryButton } from '@/Components/Buttons';
import { Head, Link } from '@inertiajs/react';
import Admin from '@/Layouts/AdminLayout';
import { Housing, PageProps } from '@/types';

export default function HousingIndex({ auth, housings }: PageProps & { housings: Housing[] }) {
  return (
    <Admin
      user={auth.user}
    >
      <Head title="Admin Housing" />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-slate-200">
              Student Housing
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              A list of all student housing including their name and type.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <PrimaryButton
              href={route('admin.housing.create')}
            >
              Add housing
            </PrimaryButton>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden ring-1 ring-black/5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-slate-700">
                  <thead className="bg-slate-800/60">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-300 sm:pl-6">
                        Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-300">
                        Housing Type
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-300">
                        # of Reviews
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">View</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700 bg-slate-800">
                    {housings.map((housing) => (
                      <tr key={housing.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-slate-300 sm:pl-6">
                          {housing.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-400">{housing.housing_type}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-400">{housing.reviews_count}</td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <Link href={route('admin.housing.show', [housing.id])} className="text-sky-600 hover:text-sky-500">
                            View<span className="sr-only">, {housing.name}</span>
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
