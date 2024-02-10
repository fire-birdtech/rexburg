import { Header2 } from '@/Components/Typography/Headers'
import { type ReactElement } from 'react'
import { Head } from '@inertiajs/react'
import Container from '@/Components/Container'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { type Business, type PageProps } from '@/types'

type ClaimBusinessProps = {
  businesses: Business[]
} & PageProps

export default function ClaimBusiness ({ auth, businesses }: ClaimBusinessProps): ReactElement {
  return (
    <Authenticated user={auth.user}>
      <Head title="Claim Your Business"/>

      <Container>
        <Header2>Claim Your Business</Header2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {businesses.map((business) => (
            <div key={business.id} className="overflow-hidden rounded-xl bg-white ring-1 ring-sky-300/40">
              <div className="px-4 py-5 sm:p-6">
                {business.name}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Authenticated>
  )
}
