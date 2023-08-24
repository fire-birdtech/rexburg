import { Head } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { HousingCard } from '@/Components/Cards';
import Container from '@/Components/Container';
import { Housing, PageProps } from '@/types';

export default function StudentHousingIndex({
  auth,
  housings,
}: PageProps & { housings: Housing[] }) {
  return (
    <Authenticated
      user={auth.user}
    >
      <Head title="Student Housing"/>

      <Container className="xl:overflow-y-hidden">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {housings.map((housing) => <HousingCard key={housing.id} housing={housing}/>)}
        </div>
      </Container>
    </Authenticated>
  );
}
