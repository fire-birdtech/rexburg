import { Head } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';

export default function Dashboard({ auth }: PageProps) {
  return (
    <Authenticated
      user={auth.user}
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">You&apos;re logged in!</div>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
