import Container from '@/Components/Container';
import { Head } from '@inertiajs/react';
import {
  AreaChart, Card, Flex, Grid, Text,
} from '@tremor/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';

const data = [
  {
    Day: 'Aug 18',
    Views: 82,
  },
  {
    Day: 'Aug 19',
    Views: 34,
  },
  {
    Day: 'Aug 20',
    Views: 60,
  },
  {
    Day: 'Aug 21',
    Views: 69,
  },
  {
    Day: 'Aug 22',
    Views: 66,
  },
  {
    Day: 'Aug 23',
    Views: 86,
  },
  {
    Day: 'Aug 24',
    Views: 41,
  },
];

export default function ManagerDashboard({ auth }: PageProps) {
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
              data={data}
              categories={['Views']}
              colors={['blue']}
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
