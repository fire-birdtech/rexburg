import { Head } from '@inertiajs/react';
import LegalLayout from '@/Layouts/LegalLayout';

export default function TermsOfService({ terms }: { terms: string }) {
  return (
		<>
			<Head title="Terms of Service"/>

			<LegalLayout content={terms}/>
		</>
  );
}
