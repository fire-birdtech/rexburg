import { StarIcon } from '@heroicons/react/24/solid';

type StarsProps = {
  score: number;
  className?: string;
}

export default function Stars({ className = '', score }: StarsProps) {
  return [...Array(5)].map((n, index) => (
    <StarIcon key={index} className={
      `fill-current ${n <= score ? 'text-sky-500' : 'text-sky-300'} ${className}`
    } />
  ));
}
