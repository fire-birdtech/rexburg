import { type PropsWithChildren, type ReactElement } from 'react'
import MainNav from '@/Components/MainNav'
import { type User } from '@/types'

export default function Authenticated ({ user, children }: PropsWithChildren<{ user: User }>): ReactElement {
  return (
    <div className="min-h-screen bg-slate-900 bg-dots-lighter selection:bg-sky-500 selection:text-white">
      <MainNav user={user} />

      <main className="py-20">
        {children}
      </main>
    </div>
  )
}
