import { Head } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import PotentialReviewsList from '@/Components/Dashboard/PotentialReviewsList';
import EmptyDashboard from '@/Components/EmptyStates/EmptyDashboard';
import Container from '@/Components/Container';
import { PageProps, View } from '@/types';

export default function Dashboard({
  auth,
  views,
}: PageProps & { views: View[] }) {
  return (
    <Authenticated
      user={auth.user}
    >
      <Head title="Dashboard"/>

      <Container>
        {views.length > 0 ? (
          <PotentialReviewsList views={views}/>
        ) : (
          <EmptyDashboard/>
        )}
      </Container>
    </Authenticated>
  );
}
