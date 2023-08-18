import { Head, router } from '@inertiajs/react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import Admin from '@/Layouts/AdminLayout';
import { convertDate } from '@/Utils/convertDate';
import { Claim, PageProps } from '@/types';

export default function ClaimShow({ auth, claim }: PageProps & { claim: Claim }) {
  const approve = () => {
    router.put(route('admin.claims.approve', [claim.id]));
  };
  const reject = () => {
    router.put(route('admin.claims.reject', [claim.id]));
  };

  return (
    <Admin
      user={auth.user}
    >
      <Head title={claim.claimable.name} />

      <div className="max-w-8xl mx-auto px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-medium leading-7 text-gray-900 sm:truncate">
              Claim for {claim.claimable.name}
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Created at {convertDate(claim.created_at)}
            </p>
          </div>
          <div className="mt-4 flex md:ml-4 md:mt-0">
            {claim.status === 'pending' ? (
              <>
                <button
                  onClick={() => reject()}
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                >
                  Reject
                </button>
                <button
                  onClick={() => approve()}
                  className="ml-3 inline-flex items-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                >
                  Approve
                </button>
              </>
            ) : null}
            {claim.status === 'approved' ? (
              <span className="inline-flex items-center gap-x-1.5 rounded-full bg-green-50 px-2 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                <CheckCircleIcon className="h-6 w-6 fill-green-500" />
                Approved
              </span>
            ) : null}
            {claim.status === 'claimed' ? (
              <span className="inline-flex items-center gap-x-1.5 rounded-full bg-green-50 px-2 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                <CheckCircleIcon className="h-6 w-6 fill-green-500" />
                Claimed
              </span>
            ) : null}
            {claim.status === 'rejected' ? (
              <span className="inline-flex items-center gap-x-1.5 rounded-full bg-red-50 px-2 py-1 text-sm font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                <XCircleIcon className="h-6 w-6 fill-red-500" />
                Rejected
              </span>
            ) : null}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-x-4">
          <div className="col-span-2 overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Claim Information
              </h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {claim.claimable.name}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    User Provided Address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <div>
                    {claim.street_address}, {claim.city}, Idaho {claim.postal_code}
                    </div>
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Verification Code
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {claim.verification_code}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="col-span-1 overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                User Information
              </h3>
            </div>
            <div className="space-y-8 border-t border-gray-200 px-4 py-5 sm:px-6">
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Name
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {claim.user.name}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Email
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {claim.user.email}
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Admin>
  );
}
