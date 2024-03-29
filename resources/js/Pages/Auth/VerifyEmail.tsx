import { type FormEventHandler, type ReactElement } from 'react'
import { Head, Link, useForm } from '@inertiajs/react'
import Guest from '@/Layouts/GuestLayout'
import { PrimaryButton } from '@/Components/Buttons'

export default function VerifyEmail ({ status }: { status?: string }): ReactElement {
  const { post, processing } = useForm({})

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('verification.send'))
  }

  return (
    <Guest>
      <Head title="Email Verification" />

      <div className="mb-4 text-sm text-slate-600 dark:text-slate-400">
        Thanks for signing up! Before getting started, could you verify your email address by clicking on the
        link we just emailed to you? If you didn&apos;t receive the email, we will gladly send you another.
      </div>

      {status === 'verification-link-sent' && (
        <div className="mb-4 text-sm font-medium text-green-600">
          A new verification link has been sent to the email address you provided during registration.
        </div>
      )}

      <form onSubmit={submit}>
        <div className="mt-4 flex items-center justify-between">
          <PrimaryButton disabled={processing}>Resend Verification Email</PrimaryButton>

          <Link
            href={route('logout')}
            method="post"
            as="button"
            className="rounded-md text-sm text-slate-600 underline hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-slate-400 dark:hover:text-slate-100"
          >
            Log Out
          </Link>
        </div>
      </form>
    </Guest>
  )
}
