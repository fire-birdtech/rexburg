import MostViewedProfilesBarList from '@/Pages/Admin/Dashboards/partials/most-viewed-profiles-bar-list'
import { type ReactElement } from 'react'
import { Head } from '@inertiajs/react'
import Admin from '@/Layouts/AdminLayout'
import ProfileViewsLineGraph from '@/Pages/Admin/Dashboards/partials/profile-views-line-graph'
import { type PageProps } from '@/types'

type MainDashboardProps = {
  topViews: any[]
  view: any[]
} & PageProps

export default function MainDashboard ({ auth, topViews, views }: MainDashboardProps): ReactElement {
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
        <div className="sm:grid sm:grid-cols-1 sm:gap-x-6 lg:grid-cols-2 xl:grid-cols-3">
          <MostViewedProfilesBarList data={topViews}/>
        </div>
      </div>
    </Admin>
  )
}
