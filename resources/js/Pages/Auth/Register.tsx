import { useEffect, type FormEventHandler, type ReactElement } from 'react'
import { Head, Link, useForm } from '@inertiajs/react'
import Guest from '@/Layouts/GuestLayout'
import Checkbox from '@/Components/Checkbox'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import { PrimaryButton } from '@/Components/Buttons'
import TextInput from '@/Components/TextInput'

export default function Register (): ReactElement {
  const {
    data, setData, post, processing, errors, reset
  } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    terms: false
  })

  useEffect(() => () => {
    reset('password', 'password_confirmation')
  }, [])

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('register'))
  }

  return (
    <Guest>
      <Head title="Register" />

      <form onSubmit={submit}>
        <div>
          <InputLabel htmlFor="name" value="Name" />

          <TextInput
            id="name"
            name="name"
            value={data.name}
            className="mt-1 block w-full"
            autoComplete="name"
            isFocused={true}
            onChange={(e) => { setData('name', e.target.value) }}
            required
          />

          <InputError message={errors.name} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="email" value="Email" />

          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            onChange={(e) => { setData('email', e.target.value) }}
            required
          />

          <InputError message={errors.email} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password" value="Password" />

          <TextInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="new-password"
            onChange={(e) => { setData('password', e.target.value) }}
            required
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

          <TextInput
            id="password_confirmation"
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            className="mt-1 block w-full"
            autoComplete="new-password"
            onChange={(e) => { setData('password_confirmation', e.target.value) }}
            required
          />

          <InputError message={errors.password_confirmation} className="mt-2" />
        </div>

        <div className="mt-4 block">
          <label className="flex items-center">
            <Checkbox
              name="terms"
              checked={data.terms}
              onChange={(e) => { setData('terms', e.target.checked) }}
            />
            <span className="ml-2 text-sm text-slate-400">
              I agree to the{' '}
              <a
                href={route('terms-of-service')}
                target="_blank"
                rel="noreferrer noopener nofollow"
                className="text-sm underline hover:text-white"
              >Terms of Service</a>{' '}
              and{' '}
              <a
                href={route('privacy-policy')}
                target="_blank"
                rel="noreferrer noopener nofollow"
                className="text-sm underline hover:text-white"
              >Privacy Policy</a>
            </span>
          </label>

          <InputError message={errors.terms} className="mt-2"/>
        </div>

        <div className="mt-4 flex items-center justify-end">
          <Link
            href={route('login')}
            className="rounded-md text-sm text-slate-400 underline hover:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Already registered?
          </Link>

          <PrimaryButton className="ml-4" disabled={processing}>
            Register
          </PrimaryButton>
        </div>
      </form>
    </Guest>
  )
}
