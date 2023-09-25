import { Head } from '@inertiajs/react';
import { Grid } from '@tremor/react';
import Container from '@/Components/Container';
import ProfileViewsCard from '@/Components/Cards/ProfileViewsCard';
import RatingsStatisticsCard from '@/Components/Cards/RatingsStatisticsCard';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { type Housing, type PageProps, type Rating } from '@/types';

export default function ManagerDashboard({
  auth, housings, ratings, views,
}: PageProps & { housings: Housing[], ratings: Rating[], views: never[] }) {
  const housingNames = housings.map((housing) => housing.name);
  return (
    <Authenticated
      user={auth.user}
    >
      <Head title="Manager Dashboard" />

      <Container>
        <h2 className="text-xl font-semibold text-slate-100">Hello, {auth.user.name.split(' ')[0]}!</h2>
        <Grid numItems={3} className="mt-8 gap-6">
          <div className="col-span-2">
            <ProfileViewsCard names={housingNames} views={views}/>
          </div>
          <aside>
            <RatingsStatisticsCard ratings={ratings} />
          </aside>
        </Grid>
      </Container>
    </Authenticated>
  );
}
