import { Head } from '@inertiajs/react';
import LegalLayout from '@/Layouts/LegalLayout';

export default function PrivacyPolicy({ policy }: { policy: string }) {
  return (
		<>
			<Head title="Privacy Policy"/>

			<LegalLayout content={policy}/>
		</>
  );
}
