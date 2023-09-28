import { type ReactElement } from 'react'
import {
  AreaChart, Card, Flex, Text
} from '@tremor/react'

export default function ProfileViewsCard ({ names, views }: { names: string[], views: never[] }): ReactElement {
  return (
    <Card>
      <Flex alignItems="start">
        <Text>
          Profile Views
        </Text>
      </Flex>
      <AreaChart
        className="mt-2 h-32"
        data={views}
        categories={names}
        index="Day"
        colors={['sky', 'blue']}
        showXAxis={true}
        showGridLines={false}
        startEndOnly={true}
        showYAxis={false}
        showLegend={false}
      />
    </Card>
  )
}
