import { type MouseEventHandler, type ReactElement } from 'react'
import { type Claimable } from '@/types'

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
