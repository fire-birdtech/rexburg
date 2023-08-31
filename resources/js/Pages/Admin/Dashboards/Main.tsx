import { Head, Link } from '@inertiajs/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import {
  AreaChart, Card, Flex, Text,
} from '@tremor/react';
import Admin from '@/Layouts/AdminLayout';
import { PageProps } from '@/types';

const links = [
  { name: 'Housing', route: route('admin.housing.index') },
  { name: 'Claims', route: route('admin.claims.index') },
];

export default function MainDashboard({ auth, views }: PageProps & { views: never[] }) {
  return (
    <Admin
      user={auth.user}
    >
      <Head title="Admin Dashboard" />

      <div className="max-w-8xl mx-auto space-y-8 sm:px-6 lg:px-8">
        <h2 className="text-slate-200">
          Admin Dashboard
        </h2>
        <Card className="w-full">
          <Flex alignItems="start">
            <Text>
              Profile Views
            </Text>
          </Flex>
          <AreaChart
            className="mt-4 h-32"
            data={views}
            categories={['Views']}
            index="Day"
            colors={['sky']}
            showXAxis={true}
            showGridLines={true}
            startEndOnly={true}
            showYAxis={false}
            showLegend={false}
          />
        </Card>
        <div className="mt-4 overflow-hidden bg-white shadow sm:rounded-md">
          <ul className="divide-y divide-gray-200" role="list">
            {links.map((link, index) => (
              <Link key={index} href={link.route}>
                <div className="flex items-center p-4 sm:px-6">
                  <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                    {link.name}
                  </div>
                  <div className="ml-5 shrink-0">
                    <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </Admin>
  );
}
