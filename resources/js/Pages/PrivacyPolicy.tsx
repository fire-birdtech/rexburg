import { type ReactElement } from 'react'
import { Head } from '@inertiajs/react'
import LegalLayout from '@/Layouts/LegalLayout'

export default function PrivacyPolicy ({ policy }: { policy: string }): ReactElement {
  return <>
    <Head title="Privacy Policy"/>
    <LegalLayout content={policy}/>
  </>
}
