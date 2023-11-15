import { Circle, DarkMode, DefineGradients, LightMode } from '@/Components/Icon'
import { type ReactElement } from 'react'
import { type Icon } from '@/types'

export function CheckIcon ({ id, color }: Icon): ReactElement {
  return (
    <>
      <DefineGradients id={id} color={color}/>
      <LightMode>
        <Circle fill={`url(#${id}-gradient)`}/>
        <path
          d="M4.5 12.75l6 6 9-13.5"
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
          d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
          fill={`url(#${id}-gradient-dark)`}
        />
      </DarkMode>
    </>
  )
}
