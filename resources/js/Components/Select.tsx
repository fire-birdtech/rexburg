import { Fragment, type ReactElement } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import InputLabel from '@/Components/InputLabel'
import { baseInputStyles } from '@/Components/TextInput'
import classNames from '@/Utils/classNames'
import capitalize from '@/Utils/strings'

interface Option {
  name: string
  value: string
}

interface SelectProps {
  data: string
  options: Option[]
  setData: (value: string) => void
}

export default function Select ({ data, options, setData }: SelectProps): ReactElement {
  return (
    <Listbox value={data} onChange={(value) => { setData(value) }}>
      {({ open }) => (
        <>
          <InputLabel>
            Housing type
          </InputLabel>
          <div className="relative mt-1">
            <Listbox.Button className={classNames(
              baseInputStyles,
              'relative w-full cursor-default rounded-md border py-2 pl-3 pr-10 text-left'
            )}>
              <span className="block truncate">
                {capitalize(data)}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none dark:bg-slate-900">
                {options.map((option: Option, index: number) => (
                  <Listbox.Option
                    key={index}
                    value={option.value}
                    className={({ active }) => classNames(active ? 'bg-sky-600 text-white' : 'text-slate-800 dark:text-slate-200', 'relative cursor-default select-none py-2 pl-3 pr-9')}
                  >
                    {({ selected, active }) => <>
                      <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                        {option.name}
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
                    </>}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
