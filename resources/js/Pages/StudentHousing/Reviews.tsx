import { type ReactElement } from 'react'
import { Head } from '@inertiajs/react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import CoverImage from '@/Components/CoverImage'
import ProfileImage from '@/Components/ProfileImage'
import { PrimaryButton } from '@/Components/Buttons'
import ReviewList from '@/Components/ReviewList'
import Container from '@/Components/Container'
import { type Housing, type PageProps } from '@/types'

export default function StudentHousingReviews ({
  auth,
  housing
}: PageProps & { housing: Housing }): ReactElement {
  return (
    <Authenticated
      user={auth.user}
    >
      <Head>
        <title>{`${housing.name} Reviews`}</title>
        <meta name="description" content={`Read reviews about ${housing.name} ${housing.housing_type} student housing at BYU-Idaho on Rexburg Guru!`}/>
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
                  <h1 className="truncate text-2xl font-bold text-slate-100 md:text-4xl">
                    {housing.name}
                  </h1>
                  {/* {housing.verified && <CheckBadgeIcon className="ml-4 h-6 w-6 text-sky-500" />} */}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
            <h1 className="truncate text-3xl font-bold text-slate-100">
              {housing.name}
            </h1>
          </div>
          <div className="mt-6">
            <PrimaryButton href={route('housing.show', [housing.slug])}>
              <span aria-hidden="true">&larr;</span> Back to profile
            </PrimaryButton>
          </div>
          <div className="mt-8">
            <div className="lg:w-2/3">
              <div className="md:px-4 md:py-5">
                <ReviewList
                  id={housing.id}
                  name={housing.name}
                  reviews={housing.reviews}
                  reviewsCount={housing.reviews_count}
                  score={housing.score}
                  scoreDescription={housing.score_description}
                  user={auth.user}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Authenticated>
  )
}
