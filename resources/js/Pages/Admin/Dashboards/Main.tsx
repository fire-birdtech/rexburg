import { type ReactElement } from 'react'
import { Head } from '@inertiajs/react'
import Admin from '@/Layouts/AdminLayout'
import ProfileViewsLineGraph from '@/Pages/Admin/Dashboards/partials/profile-views-line-graph'
import { type PageProps } from '@/types'

export default function MainDashboard ({ auth, views }: PageProps<{ views: never[] }>): ReactElement {
  return (
    <Admin
      user={auth.user}
    >
      <Head title="Admin Dashboard" />

      <div className="max-w-8xl mx-auto space-y-8 sm:px-6 lg:px-8">
        <h2 className="text-slate-900 dark:text-slate-200">
          Admin Dashboard
        </h2>
        <ProfileViewsLineGraph views={views}/>
      </div>
    </Admin>
  )
}
