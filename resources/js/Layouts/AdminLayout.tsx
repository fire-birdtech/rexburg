import { type PropsWithChildren, type ReactElement } from 'react'
import AdminNav from '@/Components/AdminNav'
import { type User } from '@/types'

export default function Admin ({ user, children }: PropsWithChildren<{ user: User }>): ReactElement {
  return (
    <>
      <AdminNav user={user} />

      <div className="lg:pl-72">
        <main className="py-4 lg:py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  )
}
