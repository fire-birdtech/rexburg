import { type ReactElement, useState } from 'react'
import { Head } from '@inertiajs/react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { ClaimHousingModal } from '@/Components/Modals'
import Container from '@/Components/Container'
import ClaimableCard from '@/Components/Cards/ClaimableCard'
import { type Claimable, type PageProps } from '@/types'

export default function ManagerProfileClaim ({ auth, claimables }: PageProps<{ claimables: Claimable[] }>): ReactElement {
  const [open, setOpen] = useState<boolean>(false)
  const [selectedClaimable, setSelectedClaimable] = useState<Claimable>()

  const handleClick = (claimable: Claimable): void => {
    setSelectedClaimable(claimable)
    setOpen(true)
  }

  return (
    <Authenticated
      user={auth.user}
    >
      <Head title="Claim" />

      <Container>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {claimables.map((claimable) => (
            <ClaimableCard
              key={claimable.id}
              claimable={claimable}
              onClick={() => { handleClick(claimable) }}
            />
          ))}
        </div>
      </Container>

      <ClaimHousingModal
        id={selectedClaimable?.id}
        type="housing"
        name={selectedClaimable?.name}
        open={open}
        setOpen={() => { setOpen(false) }}
      />
    </Authenticated>
  )
}
