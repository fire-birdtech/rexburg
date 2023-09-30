import { type FormEventHandler, type ReactElement } from 'react'
import { Head, useForm, usePage } from '@inertiajs/react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import InputLabel from '@/Components/InputLabel'
import { TextInput } from '@/Components/TextInput'
import InputError from '@/Components/InputError'
import { PrimaryButton } from '@/Components/Buttons'
import { type PageProps } from '@/types'

export default function VerifyClaim ({ auth }: PageProps): ReactElement {
  const { errors: pageErrors } = usePage().props

  const {
    data, setData, put, processing, errors
  } = useForm({
    verification_code: ''
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    put(route('claims.verify'))
  }

  return (
    <Authenticated
      user={auth.user}
    >
      <Head title="Verify your claim" />

      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
            Verify your claim
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-slate-800 px-4 py-8 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={submit} className="space-y-6">
              <div>
                <InputLabel htmlFor="code" value="Verification code" />

                <TextInput
                  id="code"
                  type="text"
                  className="mt-1 block w-full"
                  value={data.verification_code}
                  onChange={(e) => { setData('verification_code', e.target.value) }}
                  required
                  autoFocus
                />

                <InputError message={errors.verification_code ?? pageErrors.message} className="mt-2" />
              </div>

              <PrimaryButton className="flex w-full justify-center" disabled={processing}>
                Verify
              </PrimaryButton>
            </form>
          </div>
        </div>
      </div>
    </Authenticated>
  )
}
