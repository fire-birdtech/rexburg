import { type MouseEventHandler, type ReactElement } from 'react'
import { Icon } from '@/Components/Icon'
import { type Claimable } from '@/types'

interface ContactCardProps {
  name: string
  websiteUrl: string
  email: string
  phone: string
}

export function ContactCard ({
  name,
  websiteUrl,
  email,
  phone
}: ContactCardProps): ReactElement {
  return (
    <div className="sticky top-12">
      <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-5 shadow dark:border-slate-600 dark:bg-slate-900 sm:p-6">
        <div className="flex flex-col items-center">
          <div className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Contact {name}
          </div>
          {websiteUrl !== undefined && (
            <div className="mt-6 w-full">
              <a
                href={`https://${websiteUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-xl bg-sky-300 px-3.5 py-2.5 text-center text-sm font-semibold text-slate-900 shadow-sm transition duration-150 ease-in-out hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:cursor-not-allowed disabled:bg-[#B3D9E6]/80 dark:hover:bg-sky-200"
              >
                Visit website
              </a>
            </div>
          )}
          {phone !== null && (
            <>
              <a href={`tel:${phone}`} className="mt-4 inline-flex w-full justify-center rounded-md border border-slate-700 bg-slate-700/40 px-4 py-2 text-sm font-medium text-slate-200 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 xl:hidden">
                <Icon icon="mobilephone" className="h-6 w-6 shrink-0"/>
                {phone}
              </a>
              <div className="mt-4 hidden xl:flex xl:items-center">
                <Icon icon="mobilephone" className="h-6 w-6 shrink-0"/>
                <span className="ml-2 text-base font-medium text-slate-700 dark:text-slate-300 lg:text-lg">
                  {phone}
                </span>
              </div>
            </>
          )}
          {email !== null && (
            <>
              <a href={`mailto:${email}`} className="mt-4 inline-flex w-full justify-center rounded-md border border-slate-700 bg-slate-700/40 px-4 py-2 text-sm font-medium text-slate-200 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 xl:hidden">
                <Icon icon="envelope" className="h-6 w-6 shrink-0"/>
                Send an email
              </a>
              <div className="mt-4 hidden xl:flex xl:items-center">
                <Icon icon="envelope" className="h-6 w-6 shrink-0" />
                <span className="ml-2 text-base font-medium text-slate-700 dark:text-slate-300 lg:text-lg">
                  {email}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export function ClaimableCard ({ claimable, onClick }: { claimable: Claimable, onClick: MouseEventHandler<HTMLButtonElement> }): ReactElement {
  return (
    <button
      onClick={onClick}
      className="duration-250 flex scale-100 rounded-lg bg-slate-800/50 bg-gradient-to-bl from-slate-700/50 via-transparent p-4 ring-1 ring-inset ring-white/5 transition-all focus:outline focus:outline-2 focus:outline-sky-500 motion-safe:hover:scale-[1.01]"
    >
      <img
        src={claimable.cover_image_url}
        alt={claimable.name}
        className="saturate-40 absolute inset-0 h-full w-full rounded-lg object-cover brightness-50"
      />
      <div className="relative flex">
        <div className="flex w-full flex-wrap items-center gap-y-1 overflow-hidden pt-8 text-sm leading-6 text-slate-300">
          <h3 className="mt-3 w-full text-lg font-semibold leading-6 text-slate-50">
            {claimable.name}
          </h3>
        </div>
      </div>
    </button>
  )
}
