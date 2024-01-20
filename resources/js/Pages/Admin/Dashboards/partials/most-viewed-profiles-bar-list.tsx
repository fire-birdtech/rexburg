import { type ReactElement } from 'react'
import { BarList, Bold, Card, Flex, Subtitle, Text, Title } from '@tremor/react'

interface MostViewedProfilesBarListProps {
  data: any[]
}

export default function MostViewedProfilesBarList ({ data }: MostViewedProfilesBarListProps): ReactElement {
  const listData = data.map((item) => {
    return {
      value: item.value,
      name: item.viewable.name
    }
  })

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
      <BarList data={listData} className="mt-2"/>
    </Card>
  )
}
