import { type PropsWithChildren, type ReactElement } from 'react'
import { Link } from '@inertiajs/react'
import { type Claim } from '@/types'

function Banner ({ children }: PropsWithChildren): ReactElement {
  return (
    <div className="flex items-center justify-center gap-x-6 rounded-2xl bg-slate-800 px-6 py-2.5 sm:px-3.5">
      <p className="text-sm leading-6 text-white">
        <div>
          {children}
        </div>
      </p>
    </div>
  )
}

export function PendingClaimBanner ({ claim }: { claim: Claim }): ReactElement {
  return (
    <Banner>
      You&apos;re claim request for <strong>{claim.claimable.name}</strong> is pending.
      We&apos;ll let you know when it has been reviewed.
    </Banner>
  )
}

export function ApprovedClaimBanner ({ claim }: { claim: Claim }): ReactElement {
  return (
    <Banner>
      You&apos;re claim request for <strong>{claim.claimable.name}</strong> has been approved.
      A verification code has been mailed to the address you provided.
      <Link href={route('claims.verify')} className="ml-4 text-slate-400 hover:text-white">
        Verify your claim <span aria-hidden="true">&rarr;</span>
      </Link>
    </Banner>
  )
}
