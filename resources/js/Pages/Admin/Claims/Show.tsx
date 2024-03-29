import { type ReactElement } from 'react'
import { Head, router } from '@inertiajs/react'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
import Admin from '@/Layouts/AdminLayout'
import { DangerButton, PrimaryButton } from '@/Components/Buttons'
import { convertDate } from '@/Utils/convertDate'
import { type Claim, type PageProps } from '@/types'

export default function ClaimShow ({ auth, claim }: PageProps<{ claim: Claim }>): ReactElement {
  const approve = (): void => {
    router.put(route('admin.claims.approve', [claim.id]))
  }
  const reject = (): void => {
    router.put(route('admin.claims.reject', [claim.id]))
  }

  return (
    <Admin
      user={auth.user}
    >
      <Head title={claim.claimable.name} />

      <div className="max-w-8xl mx-auto px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-medium leading-7 text-slate-800 dark:text-slate-200 sm:truncate">
              Claim for {claim.claimable.name}
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
              Created at {convertDate(claim.created_at)}
            </p>
          </div>
          <div className="mt-4 flex space-x-2 md:ml-4 md:mt-0">
            {claim.status === 'pending' ? (
              <>
                <DangerButton
                  onClick={() => { reject() }}
                >
                  Reject
                </DangerButton>
                <PrimaryButton
                  onClick={() => { approve() }}
                >
                  Approve
                </PrimaryButton>
              </>
            ) : null}
            {claim.status === 'approved' ? (
              <span className="inline-flex items-center gap-x-1.5 rounded-full bg-green-500/10 py-1 pl-2 pr-4 text-sm font-medium text-green-600 ring-1 ring-inset ring-green-500/20">
                <CheckCircleIcon className="h-6 w-6 fill-green-500" />
                Approved
              </span>
            ) : null}
            {claim.status === 'claimed' ? (
              <span className="inline-flex items-center gap-x-1.5 rounded-full bg-green-500/10 py-1 pl-2 pr-4 text-sm font-medium text-green-600 ring-1 ring-inset ring-green-500/20">
                <CheckCircleIcon className="h-6 w-6 fill-green-500" />
                Claimed
              </span>
            ) : null}
            {claim.status === 'rejected' ? (
              <span className="inline-flex items-center gap-x-1.5 rounded-full bg-red-400/10 py-1 pl-2 pr-4 text-sm font-medium text-red-600 ring-1 ring-inset ring-red-400/20">
                <XCircleIcon className="h-6 w-6 fill-red-500" />
                Rejected
              </span>
            ) : null}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-x-4">
          <div className="col-span-2 overflow-hidden bg-white shadow dark:bg-slate-800 sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-slate-800 dark:text-slate-200">
                Claim Information
              </h3>
            </div>
            <div className="border-t border-slate-300 px-4 py-5 dark:border-slate-700 sm:px-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Name
                  </dt>
                  <dd className="mt-1 text-sm text-slate-800 dark:text-slate-200">
                    {claim.claimable.name}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    User Provided Address
                  </dt>
                  <dd className="mt-1 text-sm text-slate-800 dark:text-slate-200">
                    <div>
                    {claim.street_address}, {claim.city}, Idaho {claim.postal_code}
                    </div>
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Verification Code
                  </dt>
                  <dd className="mt-1 text-sm text-slate-800 dark:text-slate-200">
                    {claim.verification_code}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="col-span-1 overflow-hidden bg-white shadow dark:bg-slate-800 sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-slate-800 dark:text-slate-200">
                User Information
              </h3>
            </div>
            <div className="space-y-8 border-t border-slate-300 px-4 py-5 dark:border-slate-700 sm:px-6">
              <div>
                <dt className="text-sm font-medium text-slate-400">
                  Name
                </dt>
                <dd className="mt-1 text-sm text-slate-800 dark:text-slate-200">
                  {claim.user.name}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-400">
                  Email
                </dt>
                <dd className="mt-1 text-sm text-slate-800 dark:text-slate-200">
                  {claim.user.email}
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Admin>
  )
}
