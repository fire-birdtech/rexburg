import { type ReactElement } from 'react'
import { Head } from '@inertiajs/react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm'
import UpdatePasswordForm from './Partials/UpdatePasswordForm'
import DeleteUserForm from './Partials/DeleteUserForm'
import { type PageProps } from '@/types'

export default function Edit ({ auth, mustVerifyEmail, status }: PageProps<{ mustVerifyEmail: boolean, status?: string }>): ReactElement {
  return (
    <Authenticated
      user={auth.user}
    >
      <Head title="Profile" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
          <div className="bg-slate-800 p-4 shadow sm:rounded-lg sm:p-8">
            <UpdateProfileInformationForm
              mustVerifyEmail={mustVerifyEmail}
              status={status}
              className="max-w-xl"
            />
          </div>

          <div className="bg-slate-800 p-4 shadow sm:rounded-lg sm:p-8">
            <UpdatePasswordForm className="max-w-xl" />
          </div>

          <div className="bg-slate-800 p-4 shadow sm:rounded-lg sm:p-8">
            <DeleteUserForm className="max-w-xl" />
          </div>
        </div>
      </div>
    </Authenticated>
  )
}
