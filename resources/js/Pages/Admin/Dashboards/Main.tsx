import { type ReactElement } from 'react'
import { Head } from '@inertiajs/react'
import {
  AreaChart, Card, Flex, Text
} from '@tremor/react'
import Admin from '@/Layouts/AdminLayout'
import { type PageProps } from '@/types'

export default function MainDashboard ({ auth, views }: PageProps<{ views: never[] }>): ReactElement {
  return (
    <Admin
      user={auth.user}
    >
      <Head title="Admin Dashboard" />

      <div className="max-w-8xl mx-auto space-y-8 sm:px-6 lg:px-8">
        <h2 className="text-slate-900 dark:text-slate-200">
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
      </div>
    </Admin>
  )
}
