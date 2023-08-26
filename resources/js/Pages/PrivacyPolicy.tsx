import { Head } from '@inertiajs/react';

export default function PrivacyPolicy({ policy }: { policy: string }) {
  return (
		<>
			<Head title="Privacy Policy"/>

			<div className="bg-dots-darker bg-slate-900 font-sans text-slate-100 antialiased">
				<div>
					<div className="flex min-h-screen flex-col items-center py-6 sm:pt-0">
						{/* logo */}

						<div
							dangerouslySetInnerHTML={{ __html: policy }}
							className="prose prose-invert mx-auto mt-6 w-full overflow-hidden bg-slate-800 p-6 shadow-md sm:max-w-5xl sm:rounded-2xl"
						/>
					</div>
				</div>
			</div>
		</>
  );
}
