import { type ReactElement } from 'react'
import { Head } from '@inertiajs/react'
import LegalLayout from '@/Layouts/LegalLayout'

export default function TermsOfService ({ terms }: { terms: string }): ReactElement {
  return <>
    <Head title="Terms of Service"/>
    <LegalLayout content={terms}/>
  </>
}
