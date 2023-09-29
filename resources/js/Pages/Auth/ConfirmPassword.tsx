import { useEffect, type FormEventHandler, type ReactElement } from 'react'
import { Head, useForm } from '@inertiajs/react'
import Guest from '@/Layouts/GuestLayout'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import { PrimaryButton } from '@/Components/Buttons'
import TextInput from '@/Components/TextInput'

export default function ConfirmPassword (): ReactElement {
  const {
    data, setData, post, processing, errors, reset
  } = useForm({
    password: ''
  })

  useEffect(() => (): void => {
    reset('password')
  }, [])

  const submit: FormEventHandler = (e): void => {
    e.preventDefault()

    post(route('password.confirm'))
  }

  return (
    <Guest>
      <Head title="Confirm Password" />

      <div className="mb-4 text-sm text-slate-600 dark:text-slate-400">
        This is a secure area of the application. Please confirm your password before continuing.
      </div>

      <form onSubmit={submit}>
        <div className="mt-4">
          <InputLabel htmlFor="password" value="Password" />

          <TextInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            isFocused={true}
            onChange={(e) => { setData('password', e.target.value) }}
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="mt-4 flex items-center justify-end">
          <PrimaryButton className="ml-4" disabled={processing}>
            Confirm
          </PrimaryButton>
        </div>
      </form>
    </Guest>
  )
}
