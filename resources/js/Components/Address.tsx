import { type ReactElement } from 'react'

interface AddressProps {
  street: string
  city: string
  postalCode: string
}

export default function Address ({ street, city, postalCode }: AddressProps): ReactElement {
  return (
    <p className="mt-6 text-xl font-medium text-slate-700 dark:text-slate-300">
      {`${street}, ${city}, Idaho ${postalCode}`}
    </p>
  )
}
