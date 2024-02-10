import { type ReactElement } from 'react'
import { Head } from '@inertiajs/react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { ApprovedClaimBanner, PendingClaimBanner } from '@/Components/Banners'
import PotentialReviewsList from '@/Components/Dashboard/PotentialReviewsList'
import EmptyDashboard from '@/Components/EmptyStates/EmptyDashboard'
import Container from '@/Components/Container'
import { type Claim, type FeatureFlags, type PageProps, type View } from '@/types'

export default function Dashboard ({
  auth,
  claims,
  flags,
  views
}: PageProps & { claims: Claim[], flags: FeatureFlags, views: View[] }): ReactElement {
  return (
    <Authenticated
      user={auth.user}
    >
      <Head title="Dashboard"/>

      <Container className="space-y-8">
        <div className="space-y-3">
          {claims.map((claim) => (
            <>
              {claim.status === 'pending' ? (
                <PendingClaimBanner key={claim.id} claim={claim}/>
              ) : null}
              {claim.status === 'approved' ? (
                <ApprovedClaimBanner key={claim.id} claim={claim}/>
              ) : null}
            </>
          ))}
        </div>
        {views.length > 0 ? (
          <PotentialReviewsList views={views}/>
        ) : (
          <EmptyDashboard flags={flags}/>
        )}
      </Container>
    </Authenticated>
  )
}
