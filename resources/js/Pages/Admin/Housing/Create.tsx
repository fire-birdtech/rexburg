import { Head, useForm } from '@inertiajs/react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';
import { FormEventHandler, Fragment } from 'react';
import Admin from '@/Layouts/AdminLayout';
import classNames from '@/Utils/classNames';
import { PageProps } from '@/types';

const types = [
  { id: 1, name: 'Single', value: 'single' },
  { id: 2, name: 'Married', value: 'married' },
];

export default function HousingCreate({ auth }: PageProps) {
  const {
    data, setData, post, processing, errors,
  } = useForm({
    name: '',
    housing_type: types[0],
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('admin.housing.store'));
  };

  return (
    <Admin
      user={auth.user}
    >
      <Head title="Housing Create" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2>Add new student housing</h2>
        <form className="mt-4" onSubmit={submit}>
          <div className="space-y-6 sm:space-y-5">
            <div>
              <label htmlFor="housing-name" className="block text-sm font-medium text-gray-800">
                Housing name
              </label>
              <div className="mt-1">
                <input id="housing-name" name="housing-name" value={data.name} type="text" className="block w-full max-w-md rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" />
              </div>
              {errors.name !== null ? (
                <label className="mt-2">
                  {errors.name}
                </label>
              ) : null}
            </div>

            <div>
              <Listbox value={data.housing_type} onChange={(value) => setData('housing_type', value)}>
                {({ open }) => (
                  <>
                    <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                      Housing type
                    </Listbox.Label>
                    <div className="relative mt-2 max-w-md">
                      <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-600 sm:text-sm sm:leading-6">
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
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                          {types.map((type, index) => (
                            <Listbox.Option
                              key={index}
                              className={({ active }) => classNames(
                                active ? 'bg-sky-600 text-white' : 'text-gray-900',
                                'relative cursor-default select-none py-2 pl-3 pr-9',
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
                                        'absolute inset-y-0 right-0 flex items-center pr-4',
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
              {errors.housing_type !== null ? (
                <label className="mt-2">
                  {errors.housing_type}
                </label>
              ) : null}
            </div>

            <div className="pt-2">
              <button type="button" disabled={processing} className="inline-flex items-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </Admin>
  );
}
