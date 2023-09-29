import { type FormEventHandler, type ReactElement } from 'react'
import { Head, useForm } from '@inertiajs/react'
import Guest from '@/Layouts/GuestLayout'
import InputError from '@/Components/InputError'
import { PrimaryButton } from '@/Components/Buttons'
import TextInput from '@/Components/TextInput'

export default function ForgotPassword ({ status }: { status?: string }): ReactElement {
  const {
    data, setData, post, processing, errors
  } = useForm({
    email: ''
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('password.email'))
  }

  return (
    <Guest>
      <Head title="Forgot Password" />

      <div className="mb-4 text-sm text-slate-600 dark:text-slate-400">
        Forgot your password? No problem. Just let us know your email address and we will email you a password
        reset link that will allow you to choose a new one.
      </div>

      {status !== undefined && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}

      <form onSubmit={submit}>
        <TextInput
          id="email"
          type="email"
          name="email"
          value={data.email}
          className="mt-1 block w-full"
          isFocused={true}
          onChange={(e) => { setData('email', e.target.value) }}
        />

        <InputError message={errors.email} className="mt-2" />

        <div className="mt-4 flex items-center justify-end">
          <PrimaryButton className="ml-4" disabled={processing}>
            Email Password Reset Link
          </PrimaryButton>
        </div>
      </form>
    </Guest>
  )
}
