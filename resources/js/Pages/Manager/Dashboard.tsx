import { Head } from '@inertiajs/react';
import { Grid } from '@tremor/react';
import Container from '@/Components/Container';
import ProfileViewsCard from '@/Components/Cards/ProfileViewsCard';
import ReviewsStatisticsCard from '@/Components/Cards/ReviewsStatisticsCard';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Housing, PageProps } from '@/types';

export default function ManagerDashboard({ auth, housings, reviews, views }: PageProps & { housings: Housing[], reviews: never[], views: never[] }) {
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
            <ReviewsStatisticsCard reviews={reviews} />
          </aside>
        </Grid>
      </Container>
    </Authenticated>
  );
}
