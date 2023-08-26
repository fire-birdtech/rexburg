import { Head } from '@inertiajs/react';
import { Grid } from '@tremor/react';
import Container from '@/Components/Container';
import ProfileViewsCard from '@/Components/Cards/ProfileViewsCard';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Housing, PageProps } from '@/types';

export default function ManagerDashboard({ auth, housings, views }: PageProps & { housings: Housing[], views: never[] }) {
  const housingNames = housings.map((housing) => housing.name);
  return (
    <Authenticated
      user={auth.user}
    >
      <Head title="Manager Dashboard" />

      <Container>
        <h2 className="text-xl font-semibold text-slate-100">Hello, {auth.user.name.split(' ')[0]}!</h2>
        <Grid numItems={2} className="mt-8">
          <ProfileViewsCard names={housingNames} views={views}/>
        </Grid>
      </Container>
    </Authenticated>
  );
}
