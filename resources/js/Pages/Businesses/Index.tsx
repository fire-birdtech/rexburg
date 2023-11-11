import { type ReactElement } from 'react'
import { Head } from '@inertiajs/react'
import BusinessCard from '@/Components/Cards/BusinessCard'
import Container from '@/Components/Container'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { type Business, type PageProps } from '@/types'

export default function BusinessesIndex ({ auth, businesses }: PageProps<{ businesses: Business[] }>): ReactElement {
  return (
    <>
      <Head title="Businesses"/>

      <Authenticated user={auth.user}>
        <Container>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {businesses.map((business) => <BusinessCard key={business.id} business={business}/>)}
          </div>
        </Container>
      </Authenticated>
    </>
  )
}
