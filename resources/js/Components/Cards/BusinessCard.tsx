import { Link } from '@inertiajs/react'
import { type ReactElement } from 'react'
import { type Business } from '@/types'

export default function BusinessCard ({ business }: { business: Business }): ReactElement {
  return (
		<Link
			href={route('businesses.show', [business.slug])}
			className="duration-250 flex scale-100 rounded-2xl bg-slate-800/50 bg-gradient-to-bl from-slate-700/50 via-transparent p-6 ring-1 ring-inset ring-white/5 transition-all focus:outline focus:outline-2 focus:outline-sky-500 motion-safe:hover:scale-[1.01]"
		>
			<img
				src={business.cover_image_url}
				alt={business.name}
				className="saturate-80 absolute inset-0 h-full w-full rounded-2xl object-cover brightness-60 dark:brightness-50"
			/>
			<div className="relative flex">
				<div className="pt-32">
					<h3 className="mt-3 w-full text-lg font-semibold leading-6 text-slate-50">
						{business.name}
					</h3>
				</div>
			</div>
		</Link>
  )
}
