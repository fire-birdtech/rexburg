import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Head, router, useForm } from '@inertiajs/react';
import { ExclamationTriangleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import Admin from '@/Layouts/AdminLayout';
import { convertDate, convertDateTime } from '@/Utils/convertDate';
import { PageProps, User } from '@/types';

export default function UserShow({ auth, user }: PageProps & { user: User }) {
  const [openSuspend, setOpenSuspend] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const {
    data: suspended, setData: setSuspended, post, processing: suspendProcessing, errors,
  } = useForm({
    reason: '',
  });

  const suspend = () => {
    post(route('admin.users.suspend', [user.id]), {
      preserveScroll: true,
      onSuccess: () => setOpenSuspend(false),
    });
  };

  const deleteUser = () => {
    router.delete(route('admin.user.delete', [user.id]));
  };

  return (
    <Admin
      user={auth.user}
    >
      <Head title={user.name} />

      <div>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:px-8">
          <div className="flex items-center space-x-5">
            <div className="shrink-0">
              <div className="relative">
                <img className="h-16 w-16 rounded-full object-cover" src={user.profile_photo_url} alt={user.name} />
                <span className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {user.name}
              </h1>
              <p className="text-sm font-medium text-gray-500">
                User since{' '}
                <time dateTime={convertDateTime(user.created_at)}>
                  {convertDate(user.created_at)}
                </time>
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-8xl mx-auto mt-8 grid grid-cols-1 gap-6 sm:px-6 lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2 lg:col-start-1">
            {user.suspended_until !== null ? (
              <div className="rounded-md bg-yellow-100 p-4">
                <div className="flex">
                  <div className="shrink-0">
                    <ExclamationTriangleIcon className="h-5 w-5 text-yellow-800" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      This user is currently suspended
                    </h3>
                  </div>
                </div>
              </div>
            ) : null}

            {user.suspensions.length > 0 ? (
              <div className="rounded-md bg-red-100 p-4">
                <div className="flex">
                  <div className="shrink-0">
                    <XCircleIcon className="h-5 w-5 text-red-800" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      This user has been suspended {user.suspensions_count} {user.suspensions_count > 1 ? 'times' : 'time'}.
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <ul className="list-disc space-y-1 pl-5">
                        {user.suspensions?.map((suspension, index) => (
                          <li key={index}>
                            {suspension.reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            <section aria-labelledby="actions-title">
              <div className="bg-white shadow sm:overflow-hidden sm:rounded-lg">
                <div className="divide-y divide-gray-200">
                  <div className="px-4 py-5 sm:px-6">
                    <h2 id="actions-title" className="text-lg font-medium text-gray-900">
                      Actions
                    </h2>
                  </div>
                  <div className="flex items-center justify-between px-4 py-6 sm:px-6">
                    <div>
                      <h3 className="text-base font-medium leading-6 text-gray-900">
                        Suspend this user account
                      </h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        User information will not be affected.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpenSuspend(true)}
                      disabled={auth.user.id === user.id}
                      className="inline-flex items-center rounded-md border border-transparent bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-700 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
                    >
                      Suspend user
                    </button>
                  </div>

                  <div className="flex items-center justify-between px-4 py-6 sm:px-6">
                    <div>
                      <h3 className="text-base font-medium leading-6 text-gray-900">
                        Delete this user account
                      </h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Once you delete this user, there is no going back.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpenDelete(true)}
                      disabled={auth.user.id === user.id}
                      className="inline-flex items-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
                    >
                      Delete user
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <section aria-labelledby="stats-title" className="lg:col-span-1 lg:col-start-3">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h2 id="stats-title" className="text-lg font-medium text-gray-900">
                  User Statistics
                </h2>
              </div>

              <div className="flow-root border-t border-gray-200">
                <ul role="list" className="divide-y divide-gray-200">
                  <li className="px-6 py-4">
                    <div className="relative">
                      <div className="relative flex space-x-3">
                        <div className="flex min-w-0 flex-1 justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              Reviews
                            </p>
                          </div>
                          <div className="whitespace-nowrap text-right text-sm text-gray-500">
                            {user.reviews_count}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Transition.Root show={openSuspend} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpenSuspend}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 overflow-y-auto">
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
                <div className="relative inline-block overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                        Suspend user account
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Please provide the reason for suspending this user account.
                        </p>
                        <div className="mt-2">
                          <textarea
                            rows={4}
                            value={suspended.reason}
                            onChange={(e) => setSuspended('reason', e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            defaultValue={''}
                          />
                          {errors.reason !== null ? (
                            <label className="mt-1 block text-sm font-medium text-gray-700">
                              {errors.reason}
                            </label>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button onClick={() => suspend()} disabled={suspendProcessing} className="inline-flex w-full justify-center rounded-md border border-transparent bg-yellow-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">
                      Suspend
                    </button>
                    <button onClick={() => setOpenSuspend(false)} className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm">
                      Cancel
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <Transition.Root show={openDelete} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpenSuspend}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 overflow-y-auto">
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
                <div className="relative inline-block overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                        Delete user account
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete this user account?
                          All of their data will be permanently removed from
                          the servers forever. This action cannot be undone.
                        </p>
                        <p className="mt-1 text-sm font-medium text-gray-600">
                          It is preferred to only delete user accounts with 3
                          or more suspensions.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button onClick={() => deleteUser()} className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">
                      Delete
                    </button>
                    <button onClick={() => setOpenDelete(false)} className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm">
                      Cancel
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </Admin>
  );
}
