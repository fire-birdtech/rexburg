import { type ReactElement } from 'react'
import { BarList, Bold, Card, Flex, Subtitle, Text, Title } from '@tremor/react'

interface MostViewedProfilesBarListProps {
  data: any[]
}

export default function MostViewedProfilesBarList ({ data }: MostViewedProfilesBarListProps): ReactElement {
  return (
    <Card>
      <Title>
        Most Viewed
      </Title>
      <Subtitle className="text-sm">
        Last 30 days
      </Subtitle>
      <Flex className="mt-4">
        <Text>
          <Bold>Profile</Bold>
        </Text>
        <Text>
          <Bold>Views</Bold>
        </Text>
      </Flex>
      <BarList data={data} className="mt-2"/>
    </Card>
  )
}
