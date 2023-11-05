import { type PropsWithChildren, type ReactElement } from 'react'
import MainNav from '@/Components/MainNav'
import { type User } from '@/types'

export default function Authenticated ({ user, children }: PropsWithChildren<{ user: User }>): ReactElement {
  return (
    <>
      <MainNav user={user} />

      <main className="py-20">
        {children}
      </main>
    </>
  )
}
