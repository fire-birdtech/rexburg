import {
  type FormEventHandler, Fragment, type PropsWithChildren, type ReactElement, useEffect
} from 'react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline'
import { CheckBadgeIcon, StarIcon } from '@heroicons/react/24/solid'
import { useForm } from '@inertiajs/react'
import classNames from '@/Utils/classNames'
import InputError from '@/Components/InputError'
import TextArea from '@/Components/TextArea'
import { PrimaryButton, SecondaryButton } from '@/Components/Buttons'
import InputLabel from '@/Components/InputLabel'
import { TextInput } from '@/Components/TextInput'

interface ReviewModalProps {
  id: number
  type: string
  name: string
  open: boolean
  setOpen: () => void
}

interface ClaimHousingModalProps {
  id: number | undefined
  type: string
  name: string | undefined
  open: boolean
  setOpen: () => void
}

const ratings = [5, 4, 3, 2, 1]

const tenantOptions = ['Yes', 'No']

export function ReviewModal ({
  id, type, name, open, setOpen
}: ReviewModalProps): ReactElement {
  const {
    data, setData, post, processing, errors, reset, isDirty
  } = useForm({
    id,
    type,
    body: '',
    rating: null,
    livedHere: null
  })

  const submit = (): void => {
    post(route('reviews.create'), {
      preserveScroll: true,
      onSuccess: () => {
        reset()
        setOpen()
      }
    })
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-20 overflow-y-auto" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-300/75 transition-opacity dark:bg-slate-700/75"></div>
        </Transition.Child>

        <div className="fixed inset-0 z-20 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative inline-block w-full overflow-hidden rounded-xl bg-slate-50 px-4 pb-4 pt-5 text-left align-bottom transition-all dark:bg-slate-800 sm:my-8 sm:max-w-2xl sm:p-6 sm:align-middle">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sky-300/40 dark:bg-sky-700/40 sm:mx-0 sm:h-10 sm:w-10">
                    <ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-sky-600 dark:text-sky-500" aria-hidden="true" />
                  </div>
                  <div className="mt-3 w-full text-center sm:ml-6 sm:mt-0 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-slate-800 dark:text-slate-200">
                      Write a review of {name}
                    </Dialog.Title>
                    <div className="mt-6">
                      <RadioGroup value={data.rating} onChange={(value) => { setData('rating', value) }} className="mt-2">
                        <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
                          {ratings.map((value, index) => (
                            <RadioGroup.Option
                              key={index}
                              value={value}
                              className={({ checked, active }) => classNames(
                                active ? 'border-slate-700 dark:border-slate-300 ring-2 ring-sky-500' : 'border-slate-500',
                                checked ? 'border-transparent bg-sky-400 dark:bg-sky-600 text-white hover:bg-sky-700' : '',
                                'flex flex-col cursor-pointer items-center justify-center p-3 rounded-md border focus:outline-none hover:bg-slate-300 dark:hover:bg-slate-700'
                              )}
                            >
                              {({ checked }) => (
                                <>
                                  <div className="flex flex-1">
                                    <RadioGroup.Label as="span" className="inline-flex items-center text-sm font-medium text-slate-800 dark:text-slate-200">
                                      {value}
                                      <StarIcon className={classNames(
                                        checked ? 'text-slate-800 dark:text-slate-200' : 'text-slate-600 dark:text-slate-400',
                                        'ml-1 h-5 w-5'
                                      )} />
                                    </RadioGroup.Label>
                                  </div>
                                </>
                              )}
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                    <InputError message={errors.rating} />
                    <div className="mt-4">
                      <TextArea
                        value={data.body}
                        onChange={(e) => { setData('body', e.target.value) }}
                      />
                    </div>
                    <div className="mt-4">
                      <p className="text-slate-700 dark:text-slate-300">
                        Have you lived at {name}?
                      </p>
                      <RadioGroup value={data.livedHere} onChange={(value) => { setData('livedHere', value) }} className="mt-2">
                        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                          {tenantOptions.map((value, index) => (
                            <RadioGroup.Option
                              key={index}
                              value={value}
                              className={({ checked, active }) => classNames(
                                active ? 'border-slate-700 dark:border-slate-300 ring-2 ring-sky-500' : 'border-slate-500',
                                checked ? 'border-transparent bg-sky-400 dark:bg-sky-600 text-white hover:bg-sky-700' : '',
                                'flex flex-col cursor-pointer items-center justify-center p-3 rounded-md border focus:outline-none hover:bg-slate-300 dark:hover:bg-slate-700'
                              )}
                            >
                              {() => (
                                <>
                                  <div className="flex flex-1">
                                    <RadioGroup.Label as="span" className="inline-flex items-center text-sm font-medium uppercase text-slate-800 dark:text-slate-200">
                                      {value}
                                    </RadioGroup.Label>
                                  </div>
                                </>
                              )}
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:ml-10 sm:flex sm:pl-6 md:mt-8">
                  <PrimaryButton onClick={() => { submit() }} disabled={processing}>
                    Submit review
                  </PrimaryButton>
                  <SecondaryButton onClick={setOpen}>
                    Cancel
                  </SecondaryButton>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export function ClaimHousingModal ({
  id, type, name, open, setOpen
}: ClaimHousingModalProps): ReactElement {
  const {
    data, setData, post, processing, errors, reset
  } = useForm({
    id,
    type,
    street_address: '',
    city: '',
    postal_code: ''
  })

  useEffect(() => {
    setData('id', id)
  }, [id])

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('claims.store'), {
      preserveScroll: true,
      onSuccess: () => {
        reset()
        setOpen()
      }
    })
  }

  const onClose = (): void => {
    setOpen()
    reset()
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-20 overflow-y-auto" onClose={() => { onClose() }}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-700/75 transition-opacity"></div>
        </Transition.Child>

        <div className="fixed inset-0 z-20 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative inline-block w-full overflow-hidden rounded-xl bg-slate-50 px-4 pb-4 pt-5 text-left align-bottom transition-all dark:bg-slate-800 sm:my-8 sm:max-w-lg sm:p-6 sm:align-middle">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky-300/40 dark:bg-sky-700/40">
                    <CheckBadgeIcon className="h-6 w-6 text-sky-600 dark:text-sky-500" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-slate-800 dark:text-slate-200">
                      Claim {name}
                    </Dialog.Title>
                  </div>
                  <div className="mt-3">
                    <form onSubmit={submit}>
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        Please enter the address of {name}.
                      </p>
                      <div className="mt-3 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                          <InputLabel htmlFor="street_address" value="Street address" />

                          <TextInput
                            id="street_address"
                            type="text"
                            name="street_address"
                            value={data.street_address}
                            className="mt-1 block w-full"
                            onChange={(e) => { setData('street_address', e.target.value) }}
                          />
                          <InputError message={errors.street_address} className="mt-2" />
                        </div>

                        <div className="sm:col-span-3">
                          <InputLabel htmlFor="city" value="City" />

                          <TextInput
                            id="city"
                            type="text"
                            name="city"
                            value={data.city}
                            className="mt-1 block w-full"
                            onChange={(e) => { setData('city', e.target.value) }}
                          />

                          <InputError message={errors.city} className="mt-2" />
                        </div>

                        <div className="sm:col-span-3">
                          <InputLabel htmlFor="postal_code" value="ZIP / Postal code" />

                          <TextInput
                            id="postal_code"
                            type="text"
                            name="postal_code"
                            value={data.postal_code}
                            className="mt-1 block w-full"
                            onChange={(e) => { setData('postal_code', e.target.value) }}
                          />

                          <InputError message={errors.postal_code} className="mt-2" />
                        </div>
                      </div>
                      <div className="mt-6">
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                          By clicking &ldquo;Claim&rdquo; below, you verify that you are either the owner or manager of {name} and accept the responsibility of maintaining this profile.
                        </p>
                      </div>
                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                        <PrimaryButton type="button" disabled={!isDirty || data.street_address === '' || data.city === '' || data.postal_code === '' || processing}>
                          Claim
                        </PrimaryButton>
                        <SecondaryButton type="button" onClick={() => { onClose() }}>
                          Cancel
                        </SecondaryButton>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export function Modal ({
  children,
  show = false,
  maxWidth = '2xl',
  closeable = true,
  onClose = () => { }
}: PropsWithChildren<{
  show: boolean
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  closeable?: boolean
  onClose: CallableFunction
}>): ReactElement {
  const close = (): void => {
    if (closeable) {
      onClose()
    }
  }

  const maxWidthClass = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl'
  }[maxWidth]

  return (
    <Transition show={show} as={Fragment} leave="duration-200">
      <Dialog
        as="div"
        id="modal"
        className="fixed inset-0 z-50 flex items-center overflow-y-auto px-4 py-6 transition-all sm:px-0"
        onClose={close}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute inset-0 bg-slate-700/75" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <Dialog.Panel
            className={`mb-6 overflow-hidden rounded-lg bg-slate-800 shadow-lg transition-all sm:mx-auto sm:w-full ${maxWidthClass}`}
          >
            {children}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}
