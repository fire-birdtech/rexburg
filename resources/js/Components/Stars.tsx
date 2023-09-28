import { type ReactElement } from 'react'
import { StarIcon } from '@heroicons/react/24/solid'

interface StarsProps {
  score: number
  className?: string
}

export default function Stars ({ className = '', score }: StarsProps): ReactElement[] {
  return [...Array(5)].map((n, index) => (
    <StarIcon key={index} className={
      `fill-current ${n <= score ? 'text-sky-500' : 'text-sky-300'} ${className}`
    } />
  ))
}
