import { type ReactElement, useState } from 'react'
import ReviewItem from '@/Components/ReviewItem'
import Stars from './Stars'
import { PrimaryButton, SecondaryButton } from './Buttons'
import { ReviewModal } from './Modals'
import { type Review, type User } from '@/types'

interface ReviewListProps {
  id: number
  name: string
  reviews: Review[]
  reviewsCount: number
  score: number
  scoreDescription: string
  user: User
}

export default function ReviewList ({
  id,
  name,
  reviews,
  reviewsCount,
  score,
  scoreDescription,
  user
}: ReviewListProps): ReactElement {
  const [open, setOpen] = useState(false)

  return (
    <>
      <h2 className="text-3xl text-slate-100">
        Reviews of {name}
      </h2>
      {reviewsCount > 0 ? (
        <>
          <div className="mt-8 flex flex-col space-y-6 sm:flex-row sm:space-x-4 sm:space-y-0 md:space-x-8">
            <div className="flex flex-col rounded-md border-2 border-sky-800">
              <div className="flex flex-1 flex-col items-center justify-center px-10 py-6 text-sky-500">
                <div className="text-6xl font-medium">
                  {score}
                </div>
                <div className="text-3xl">
                  {scoreDescription}
                </div>
              </div>
              <div className="bg-sky-800 p-4">
                <div className="text-center text-2xl text-white">
                  Out of 5
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-hidden rounded-md bg-slate-800 text-slate-300">
              <div className="flex flex-col space-y-4 p-8 xl:p-10">
                <div className="flex flex-col justify-center space-y-8 sm:flex-row sm:items-center sm:space-x-6 sm:space-y-0 xl:space-x-10">
                  <div className="shrink-0">
                    <div className="flex space-x-1">
                      <Stars className="h-8 w-8 sm:h-6 sm:w-6 md:h-8 md:w-8" score={score} />
                    </div>
                    <div className="mt-2 text-xl font-medium md:text-2xl">
                      {score} score
                    </div>
                    <div className="mt-3 text-base">
                      {reviewsCount} {reviewsCount === 1 ? 'Review' : 'Reviews'}
                    </div>
                  </div>
                  <div className="flex-1">
                    {user !== null ? (
                      <>
                        <p className="text-lg">Share details of your own experience with {name}.</p>
                        <PrimaryButton className="mt-3" onClick={() => { setOpen(true) }}>
                          Write my review
                        </PrimaryButton>
                      </>
                    ) : (
                      <>
                        <p className="text-base xl:text-lg">
                          Login or create a free account to share details of your experience with {name}.
                        </p>
                        <div className="hidden md:mt-4 md:inline-flex md:w-full md:flex-col xl:flex-row">
                          <PrimaryButton href={route('register')}>
                            Create an account
                          </PrimaryButton>
                          <SecondaryButton href={route('login')}>
                            Login
                          </SecondaryButton>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="md:hidden">
                  {user !== null ? (
                    <PrimaryButton onClick={() => { setOpen(true) }}>
                      Write my review
                    </PrimaryButton>
                  ) : (
                    <div className="mt-4 inline-flex w-full flex-col sm:flex-row sm:space-x-2">
                      <PrimaryButton href={route('register')}>
                        Create an account
                      </PrimaryButton>
                      <SecondaryButton href={route('login')}>
                        Login
                      </SecondaryButton>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 space-y-20">
            {reviews.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </div>
        </>
      ) : (
        <div className="mt-8 flex-1 overflow-hidden rounded-xl border border-slate-600 bg-slate-900">
          <div className="flex flex-col items-center justify-center space-x-10 px-4 py-5 sm:p-6 md:flex-row">
            <div className="flex-1">
              <p className="text-lg text-slate-200">
                We currently don&apos;t have any reviews for {name}.
              </p>
              <p className="mt-3 text-base text-slate-400">
                Be the first to share details of your own experience.
              </p>
              {user !== null ? (
                <PrimaryButton onClick={() => { setOpen(true) }} className="mt-4">
                  Write my review
                </PrimaryButton>
              ) : (
                <div className="mt-4 inline-flex w-full flex-col sm:flex-row sm:space-x-2">
                  <PrimaryButton href={route('register')}>
                    Create an account
                  </PrimaryButton>
                  <SecondaryButton href={route('login')}>
                    Login
                  </SecondaryButton>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <ReviewModal
        id={id}
        type="housing"
        name={name}
        open={open}
        setOpen={() => { setOpen(false) }}
      />
    </>
  )
}
