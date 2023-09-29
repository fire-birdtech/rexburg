import { type ReactElement } from 'react'
import { StarIcon } from '@heroicons/react/24/solid'

interface StarsProps {
  score: number
  className?: string
}

export default function Stars ({ className = '', score }: StarsProps): ReactElement[] {
  return [...Array(5)].map((n, index) => (
    <StarIcon key={index} className={
      `${index + 1 <= score ? 'text-sky-600 dark:text-sky-500' : 'text-sky-300'} ${className} ${n}`
    } />
  ))
}
