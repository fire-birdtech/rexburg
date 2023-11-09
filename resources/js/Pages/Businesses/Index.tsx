import Container from '@/Components/Container'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { type ReactElement } from 'react'
import { type PageProps } from '@/types'

export default function BusinessesIndex ({ auth }: PageProps): ReactElement {
  return (
    <>
      <Head title="Businesses"/>

      <Authenticated user={auth.user}>
        <Container>
          <h1>Businesses</h1>
        </Container>
      </Authenticated>
    </>
  )
}
