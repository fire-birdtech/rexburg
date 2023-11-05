import { type ReactElement } from 'react'
import { Head } from '@inertiajs/react'
import MainNav from '@/Components/MainNav'
import Hero from '@/Components/Hero'
import { type PageProps } from '@/types'

export default function Welcome ({ auth }: PageProps): ReactElement {
  const { user } = auth

  return (
    <>
      <Head>
        <title>Welcome</title>
        <meta name="description" content="The go-to place for student housing at BYU-Idaho"/>
      </Head>

      <MainNav user={user} />
      <Hero />
    </>
  )
}
