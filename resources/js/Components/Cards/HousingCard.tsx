import Stars from '@/Components/Stars'
import { Link } from '@inertiajs/react'
import { type ReactElement } from 'react'
import { type Housing } from '@/types'

export default function HousingCard ({ housing }: { housing: Housing }): ReactElement {
  return (
    <Link
      href={route('housing.show', [housing.slug])}
      className="duration-250 flex scale-100 rounded-2xl bg-slate-800/50 bg-gradient-to-bl from-slate-700/50 via-transparent p-6 ring-1 ring-inset ring-white/5 transition-all focus:outline focus:outline-2 focus:outline-sky-500 motion-safe:hover:scale-[1.01]"
    >
      <img
        src={housing.cover_image_url}
        alt={housing.name}
        className="saturate-80 absolute inset-0 h-full w-full rounded-2xl object-cover brightness-60 dark:brightness-50"
      />
      <div className="relative flex">
        <div className="pt-32">
          <div className="flex w-full flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-slate-300">
            <div className="flex items-center">
              <Stars className="h-4 w-4" score={housing.score} />
              <span className="ml-2 font-semibold">{housing.score}</span>
              <span className="ml-4">{housing.reviews_count} {housing.reviews_count === 1 ? 'review' : 'reviews'}</span>
            </div>
          </div>
          <div className="mt-2 flex w-full flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-slate-300">
            <div className="flex items-center gap-x-4">
              <div className="flex items-baseline text-slate-100">
                {housing.rent_range}
                <span className="ml-1 text-sm text-slate-300">
                  {housing.housing_type === 'single' ? '/semesterly' : '/monthly'}
                </span>
              </div>
            </div>
            <h3 className="mt-3 w-full text-lg font-semibold leading-6 text-slate-50">
              {housing.name}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  )
}
