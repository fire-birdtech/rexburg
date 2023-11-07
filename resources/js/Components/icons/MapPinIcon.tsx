import { DarkMode, Gradient, LightMode } from '@/Components/Icon'
import { type ReactElement } from 'react'
import { type Icon } from '@/types'

export function MapPinIcon ({ id, color }: Icon): ReactElement {
  return (
    <>
      <defs>
        <Gradient
          id={`${id}-gradient`}
          color={color}
          gradientTransform="rotate(65.924 1.519 20.92) scale(25.7391)"
        />
        <Gradient
          id={`${id}-gradient-dark`}
          color={color}
          gradientTransform="matrix(0 24.5 -24.5 0 16 5.5)"
        />
      </defs>
      <LightMode>
        <circle cx={20} cy={20} r={12} fill={`url(#${id}-gradient)`} />
        <path
          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          fillOpacity={0.5}
          className="fill-[var(--icon-background)] stroke-[color:var(--icon-foreground)]"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          fillOpacity={0.5}
          className="fill-[var(--icon-background)] stroke-[color:var(--icon-foreground)]"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </LightMode>
      <DarkMode>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
          fill={`url(#${id}-gradient-dark)`}
        />
      </DarkMode>
    </>
  )
}
