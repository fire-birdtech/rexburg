import { type ReactElement } from 'react'
import { Circle, DarkMode, DefineGradients, LightMode } from '@/Components/Icon'
import { type Icon } from '@/types'

export function MobilePhoneIcon ({ id, color }: Icon): ReactElement {
  return (
    <>
      <DefineGradients id={id} color={color}/>
      <LightMode>
        <Circle fill={`url(#${id}-gradient)`}/>
        <path
          d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
          fillOpacity={0.5}
          className="fill-[var(--icon-background)] stroke-[color:var(--icon-foreground)]"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </LightMode>
      <DarkMode>
        <path
          d="M10.5 18.75a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
          fill={`url(#${id}-gradient-dark)`}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.625.75A3.375 3.375 0 005.25 4.125v15.75a3.375 3.375 0 003.375 3.375h6.75a3.375 3.375 0 003.375-3.375V4.125A3.375 3.375 0 0015.375.75h-6.75zM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 017.5 19.875V4.125z"
          fill={`url(#${id}-gradient-dark)`}
        />
      </DarkMode>
    </>
  )
}
