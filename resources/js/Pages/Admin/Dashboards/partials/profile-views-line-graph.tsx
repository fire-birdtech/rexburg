import { type ReactElement } from 'react'
import { AreaChart, Card, Flex, Text } from '@tremor/react'

interface ProfileViewsLineGraphProps {
  views: any[]
}

export default function ProfileViewsLineGraph ({ views }: ProfileViewsLineGraphProps): ReactElement {
  return (
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
  )
}
