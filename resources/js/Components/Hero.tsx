import { type ReactElement } from 'react'
import { Link } from '@inertiajs/react'

import singleHousing from '../../images/single-housing.jpg'
import marriedHousing from '../../images/married-housing.jpg'
import blurCyanImage from '../../images/blur-cyan.png'

const links = [
  {
    name: 'Single Housing',
    href: route('housing.single'),
    image: singleHousing,
    alt: 'Group of students',
    description: 'Find BYU-I approved housing for single students. You can get private rooms or apartments ranging from 4-8 people.'
  },
  {
    name: 'Married Housing',
    href: route('housing.married'),
    image: marriedHousing,
    alt: 'Young married couple',
    description: 'Married housing is crucial, but difficult to find. We\'re making it easier. You can find different sizes and amenities.'
  }
]

export default function Hero (): ReactElement {
  return (
    <main className="isolate h-full">
      <div className="relative isolate -z-10 min-h-screen overflow-hidden pt-14">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            <h1 className="max-w-2xl bg-gradient-to-r from-indigo-400 via-sky-600 to-indigo-400 bg-clip-text py-1 text-4xl font-bold tracking-tight text-transparent dark:from-indigo-200 dark:via-sky-400 dark:to-indigo-200 sm:text-6xl lg:col-span-2 lg:mt-12 xl:col-auto">
              We&apos;re changing the way students enjoy Rexburg.
            </h1>
            <div className="mt-5 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
              <p className="text-lg leading-8 text-slate-700 dark:text-slate-300">
                Are you a college student in Rexburg, Idaho struggling to find the perfect
                place to live? Look no further than RexburgGuru, designed specifically for
                students like you. Search through a variety of listings to find the perfect
                place to call home while pursuing your education. Don&apos;t settle for subpar
                housing options - let us help you find the perfect fit for your needs and
                budget. Start your search today!
              </p>
            </div>
            <div className="relative mt-10 aspect-[6/5] max-w-lg space-y-6 sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2">
              <img
                className="absolute -right-56 -top-32"
                src={blurCyanImage}
                alt=""
              />
              <img
                className="absolute -bottom-40 -right-16"
                src={blurCyanImage}
                alt=""
              />
              {links.map((link, index) => (
                <Link href={link.href} key={index} className="flex scale-100 rounded-2xl bg-slate-50 bg-gradient-to-bl from-slate-700/50 via-transparent p-6 shadow-none shadow-slate-500/20 ring-1 ring-inset ring-white/5 transition-all duration-300 focus:outline focus:outline-2 focus:outline-sky-500 motion-safe:hover:scale-[1.01] dark:bg-slate-800/50">
                  <img src={link.image} alt={link.alt} className="saturate-80 absolute inset-0 h-full w-full rounded-2xl object-cover brightness-60 dark:brightness-50" />
                  <div className="hidden md:absolute md:bottom-16 md:left-[50rem] md:block md:transform-gpu md:blur-3xl" aria-hidden="true">
                    <div className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#ff4694] to-[#776fff] opacity-25" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
                  </div>
                  <div className="relative flex">
                    <div className="pt-16">
                      <h2 className="text-xl font-semibold text-white">{link.name}</h2>
                      <p className="mt-4 text-sm font-medium leading-relaxed text-white dark:text-slate-300">
                        {link.description}
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      className="mx-6 h-6 w-6 shrink-0 self-center stroke-sky-200"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
