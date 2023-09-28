import { type FormEventHandler, Fragment, type ReactElement } from 'react'
import { Head, useForm } from '@inertiajs/react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid'
import { PrimaryButton } from '@/Components/Buttons'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import Admin from '@/Layouts/AdminLayout'
import classNames from '@/Utils/classNames'
import { type PageProps } from '@/types'

const types = [
  { id: 1, name: 'Single', value: 'single' },
  { id: 2, name: 'Married', value: 'married' }
]

export default function HousingCreate ({ auth }: PageProps): ReactElement {
  const {
    data, setData, post, processing, errors
  } = useForm({
    name: '',
    housing_type: types[0]
  })

  const submit: FormEventHandler = (e): void => {
    e.preventDefault()

    post(route('admin.housing.store'))
  }

  return (
    <Admin
      user={auth.user}
    >
      <Head title="Housing Create" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-slate-800 dark:text-slate-200">
          Add new student housing
        </h2>
        <form className="mt-4" onSubmit={submit}>
          <div className="space-y-6 sm:space-y-5">
            <div>
              <InputLabel htmlFor="housing-name" value="Housing name" />

              <TextInput
                id="housing-name"
                name="housing-name"
                value={data.name}
                className="mt-1 block w-full max-w-md"
                onChange={(e) => { setData('name', e.target.value) }}
              />

              <InputError message={errors.name} className="mt-1"/>
            </div>

            <div>
              <Listbox value={data.housing_type} onChange={(value) => { setData('housing_type', value) }}>
                {({ open }) => (
                  <>
                    <Listbox.Label className="block text-sm font-medium leading-6 text-slate-300">
                      Housing type
                    </Listbox.Label>
                    <div className="relative mt-1 max-w-md">
                      <Listbox.Button className="relative w-full cursor-default rounded-md bg-slate-900 py-1.5 pl-3 pr-10 text-left text-slate-300 shadow-sm ring-1 ring-inset ring-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-600 sm:text-sm sm:leading-6">
                        <span className="block truncate">
                          {data.housing_type.name}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                          {types.map((type, index) => (
                            <Listbox.Option
                              key={index}
                              className={({ active }) => classNames(
                                active ? 'bg-slate-900 text-white' : 'text-slate-200',
                                'relative cursor-default select-none py-2 pl-3 pr-9'
                              )}
                              value={type}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                    {type.name}
                                  </span>
                                  {selected ? (
                                    <span
                                      className={classNames(
                                        active ? 'text-white' : 'text-sky-600',
                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                      )}
                                    >
                                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>

              <InputError message={errors.housing_type} className="mt-1"/>
            </div>

            <div className="pt-2">
              <PrimaryButton
                disabled={processing}
              >
                Create
              </PrimaryButton>
            </div>
          </div>
        </form>
      </div>
    </Admin>
  )
}
