import Container from '@/Components/Container';
import { Head } from '@inertiajs/react';
import {
  AreaChart, Card, Flex, Grid, Text,
} from '@tremor/react';
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
          <Card>
            <Flex alignItems="start">
              <Text>Profile Views</Text>
            </Flex>
            <AreaChart
              className="mt-6 h-32"
              data={views}
              categories={housingNames}
              colors={['sky', 'blue']}
              index="Day"
              showXAxis={true}
              showGridLines={false}
              startEndOnly={true}
              showYAxis={false}
              showLegend={false}
            />
          </Card>
        </Grid>
      </Container>
    </Authenticated>
  );
}
