import { type ReactElement, useState } from 'react'
import { Head, Link } from '@inertiajs/react'
import {
  CheckCircleIcon
} from '@heroicons/react/24/solid'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { PrimaryButton } from '@/Components/Buttons'
import { Header2 } from '@/Components/Typography/Headers'
import Address from '@/Components/Address'
import MetaDataItem from '@/Components/MetaDataItem'
import Stars from '@/Components/Stars'
import StatisticItem from '@/Components/StatisticItem'
import CoverImage from '@/Components/CoverImage'
import ProfileImage from '@/Components/ProfileImage'
import ContactCard from '@/Components/Cards/ContactCard'
import ReviewList from '@/Components/ReviewList'
import { ClaimHousingModal } from '@/Components/Modals'
import Container from '@/Components/Container'
import { type Housing, type PageProps } from '@/types'

export default function StudentHousingShow ({
  auth,
  canEdit,
  housing
}: PageProps & { housing: Housing, canEdit: boolean }): ReactElement {
  const isClaimed = (housing.managers.length > 0) || housing.claim !== null

  const [claimDialogOpen, setClaimDialogOpen] = useState(false)

  return (
    <Authenticated
      user={auth.user}
    >
      <Head>
        <title>{housing.name}</title>
        <meta name="description" content={`Check out ${housing.name} ${housing.housing_type} student housing at BYU-Idaho on Rexburg Guru!`}/>
      </Head>

      <Container>
        <div>
          <CoverImage src={housing.cover_image_url} name={housing.name}/>
        </div>
        <div className="max-w-8xl mx-auto px-4 pb-20 sm:px-6 lg:px-8">
          <div className="-mt-12 sm:-mt-16 sm:flex sm:items-start">
            <div className="sm:flex sm:items-end sm:space-x-5">
              <div className="flex">
                <ProfileImage src={housing.profile_image_url} name={housing.name}/>
              </div>
              <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                <div className="mt-6 flex min-w-0 flex-1 items-center sm:hidden md:flex">
                  <h1 className="truncate text-2xl font-bold text-slate-900 dark:text-slate-100 md:text-4xl">
                    {housing.name}
                  </h1>
                  {/* {housing.verified && <CheckBadgeIcon className="ml-4 h-6 w-6 text-sky-500" />} */}
                </div>
              </div>
            </div>
            {canEdit && (
              <div className="ml-auto space-x-4">
                <PrimaryButton href={route('housing.edit', [housing.slug])} className="mt-3 sm:mt-0">
                  Edit profile
                </PrimaryButton>
              </div>
            )}
          </div>
          <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
            <h1 className="truncate text-3xl font-bold text-slate-100">
              {housing.name}
            </h1>
          </div>
          {auth.user !== undefined && !isClaimed && (
            <button onClick={() => { setClaimDialogOpen(true) }} className="group mt-6 inline-flex space-x-4">
              <span
                className="rounded-lg bg-sky-200 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700 group-hover:bg-sky-300 dark:group-hover:bg-slate-50">
                Claim this housing
              </span>
              <span
                className="inline-flex items-center space-x-1 text-sm font-medium text-sky-500 group-hover:text-sky-600 dark:group-hover:text-slate-50">
                <span>Do you manage {housing.name}? &rarr;</span>
              </span>
            </button>
          )}
          <Address
            street={housing.street}
            city={housing.city}
            postalCode={housing.postal_code}
          />
          <div
            className="flex flex-col space-y-3 pt-4 text-slate-700 dark:text-slate-300 sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6 sm:space-y-0">
            {housing.byui_approved === true && <MetaDataItem icon="check" value="BYU-Idaho Approved"/>}
            {housing.housing_type === 'single' ? (
              <MetaDataItem icon="student" value="Single Housing"/>
            ) : (
              <MetaDataItem icon="students" value="Married Housing"/>
            )}
            <MetaDataItem icon="mapPin" value={housing.city}/>
          </div>
          {housing.reviews_count > 0 && (
            <div className="flex items-end space-x-2">
              <div className="flex items-center space-x-4 pt-5">
                <div className="flex space-x-1">
                  <Stars className="h-6 w-6" score={housing.score}/>
                </div>
              </div>
              <div className="text-slate-800 dark:text-slate-200">({housing.score})</div>
              <Link href="#review-list" className="text-slate-600 hover:underline hover:underline-offset-2 dark:text-slate-400">
                See reviews
              </Link>
            </div>
          )}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <StatisticItem
              name={
                housing.housing_type === 'single'
                  ? 'Semesterly Rent'
                  : 'Monthly Rent'
              }
              stat={housing.rent_range}
            />
            <StatisticItem
              name="Bedrooms"
              stat={housing.bedroom_range}
            />
            <StatisticItem
              name="Bathrooms"
              stat={housing.bathroom_range}
            />
          </div>
          <div className="lg:flex">
            <aside className="mt-8 md:order-2 md:ml-5 md:w-1/3">
              <ContactCard
                name={housing.name}
                websiteUrl={housing.website_url}
                phone={housing.phone_number}
                email={housing.email_address}
              />
            </aside>
            <div className="mt-8 md:order-1 md:w-2/3">
              <div className="space-y-10">
                {housing.amenities.length > 0 && (
                  <>
                    <Header2>
                      Amenities
                    </Header2>
                    <div className="py-4">
                      <dl className="grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-2 sm:gap-y-2 xl:grid-cols-3">
                        {housing.amenities.map((amenity, index) => (
                          <div key={index} className="sm:col-span-1">
                            <dd className="mt-1 flex text-base leading-5 text-slate-100">
                              <CheckCircleIcon className="mr-1.5 h-5 w-5 shrink-0 text-sky-500"/>
                              {amenity.name}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </>
                )}
                {housing.about !== undefined && (
                  <>
                    <Header2>
                      About {housing.name}
                    </Header2>
                    <div
                      className="prose prose-invert mt-4 max-w-none"
                      dangerouslySetInnerHTML={{ __html: housing.about }}
                    />
                  </>
                )}
                <div id="review-list" className="scroll-mt-4">
                  <ReviewList
                    id={housing.id}
                    name={housing.name}
                    reviews={housing.reviews}
                    reviewsCount={housing.reviews_count}
                    score={housing.score}
                    scoreDescription={housing.score_description}
                    user={auth.user}
                  />
                  {housing.reviews_count > 0 && (
                    <div className="mt-16 flex w-full items-center">
                      <PrimaryButton href={route('housing.reviews', [housing.slug])}>
                        See all reviews
                      </PrimaryButton>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <ClaimHousingModal
          id={housing.id}
          type="housing"
          name={housing.name}
          open={claimDialogOpen}
          setOpen={() => { setClaimDialogOpen(false) }}
        />
      </Container>
    </Authenticated>
  )
}
