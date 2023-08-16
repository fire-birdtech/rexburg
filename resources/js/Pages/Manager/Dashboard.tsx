import { Head } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';

export default function ManagerDashboard({ auth }: PageProps) {
  return (
    <Authenticated
      user={auth.user}
    >
      <Head title="Manager Dashboard" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-slate-100">Hello, {auth.user.name.split(' ')[0]}!</h2>
      </div>
    </Authenticated>
  );
}
