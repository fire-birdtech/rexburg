import { type ReactElement } from 'react'
import { BarList, Bold, Card, Flex, Text, Title } from '@tremor/react'

interface MostViewedProfilesBarListProps {
  data: any[]
}

export default function MostViewedProfilesBarList ({ data }: MostViewedProfilesBarListProps): ReactElement {
  return (
    <Card className="max-w-sm">
      <Title>
        Most Viewed
      </Title>
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
