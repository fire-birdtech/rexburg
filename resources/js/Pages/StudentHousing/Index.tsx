import { Head } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import HousingCard from '@/Components/Cards';
import { Housing, PageProps } from '@/types';

export default function StudentHousingIndex({ auth, housings }: PageProps & { housings: Housing[] }) {
  return (
    <Authenticated
      user={auth.user}
    >
      <Head title="Student Housing" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:overflow-y-hidden">
        <div className="grid gap-4 py-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {housings.map((housing) => <HousingCard key={housing.id} housing={housing} />)}
        </div>
      </div>
    </Authenticated>
  );
}
