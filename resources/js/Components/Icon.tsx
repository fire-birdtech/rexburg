import { CheckIcon } from '@/Components/icons/CheckIcon'
import { HomeIcon } from '@/Components/icons/HomeIcon'
import { MapPinIcon } from '@/Components/icons/MapPinIcon'
import { MarriedPeopleIcon } from '@/Components/icons/MarriedPeopleIcon'
import { type ReactElement, useId, type Key, type SVGProps, type PropsWithChildren } from 'react'
import { type JSX } from 'react/jsx-runtime'
import classNames from '@/Utils/classNames'

import { EnvelopeIcon } from '@/Components/icons/EnvelopeIcon'
import { MobilePhoneIcon } from '@/Components/icons/MobilePhoneIcon'
import { SinglePersonIcon } from '@/Components/icons/SinglePersonIcon'

interface Props {
  icon: string
  className?: string
  color?: string
}

const icons = {
  check: CheckIcon,
  envelope: EnvelopeIcon,
  home: HomeIcon,
  mapPin: MapPinIcon,
  mobilephone: MobilePhoneIcon,
  student: SinglePersonIcon,
  students: MarriedPeopleIcon
}

const iconStyles = {
  blue: '[--icon-foreground:theme(colors.slate.900)] [--icon-background:theme(colors.white)]',
  amber:
    '[--icon-foreground:theme(colors.amber.900)] [--icon-background:theme(colors.amber.100)]'
}

export function Icon ({
  icon,
  color = 'blue',
  className = '',
  ...props
}: Props): ReactElement {
  const id = useId()
  const IconComponent = icons[icon]

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={classNames(className, iconStyles[color])}
      {...props}
    >
      <IconComponent id={id} color={color}/>
    </svg>
  )
}

const gradients = {
  blue: [
    { stopColor: '#0EA5E9' },
    {
      stopColor: '#22D3EE',
      offset: '.527'
    },
    {
      stopColor: '#818CF8',
      offset: 1
    }
  ],
  amber: [
    {
      stopColor: '#FDE68A',
      offset: '.08'
    },
    {
      stopColor: '#F59E0B',
      offset: '.837'
    }
  ]
}

export function Gradient ({
  color = 'blue',
  ...props
}: {
  id?: string
  color?: string
  gradientTransform?: string
}): ReactElement {
  return (
    <radialGradient
      cx={0}
      cy={0}
      r={1}
      gradientUnits="userSpaceOnUse"
      {...props}
    >
      {gradients[color].map((stop: JSX.IntrinsicAttributes & SVGProps<SVGStopElement>, stopIndex: Key | null | undefined) => (
        <stop key={stopIndex} {...stop} />
      ))}
    </radialGradient>
  )
}

export function Circle ({ fill }: { fill: string }): ReactElement {
  return <circle cx={16} cy={14} r={6} fill={fill} />
}

export function LightMode ({ className, children, ...props }: PropsWithChildren & { className?: string }): ReactElement {
  return <g className={classNames('dark:hidden', className as string)} {...props}>
    {children}
  </g>
}

export function DarkMode ({ className, children, ...props }: PropsWithChildren & { className?: string }): ReactElement {
  return <g className={classNames('hidden dark:inline', className as string)} {...props}>
    {children}
  </g>
}
