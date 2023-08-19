import { Head } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import EmptyDashboard from '@/Components/EmptyStates/EmptyDashboard';
import { PageProps, View } from '@/types';

export default function Dashboard({ auth, views }: PageProps & { views: View[] }) {
  return (
    <Authenticated
      user={auth.user}
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <EmptyDashboard />
        </div>
      </div>
    </Authenticated>
  );
}
