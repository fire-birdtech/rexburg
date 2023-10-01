import { type ReactElement } from 'react'
import { Head } from '@inertiajs/react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { HousingCard } from '@/Components/Cards'
import Container from '@/Components/Container'
import { type Housing, type PageProps } from '@/types'

export default function StudentHousingIndex ({
  auth,
  housings,
  type
}: PageProps & { housings: Housing[], type: string }): ReactElement {
  return (
    <Authenticated
      user={auth.user}
    >
      <Head>
        <title>Student Housing</title>
        <meta name="description" content={`Find the perfect ${type} student housing at BYU-Idaho for you.`}/>
      </Head>

      <Container className="xl:overflow-y-hidden">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {housings.map((housing) => <HousingCard key={housing.id} housing={housing}/>)}
        </div>
      </Container>
    </Authenticated>
  )
}
