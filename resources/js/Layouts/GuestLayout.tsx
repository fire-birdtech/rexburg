import { PropsWithChildren } from 'react';
import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Guest({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col items-center bg-slate-900 bg-dots-lighter pt-6 selection:bg-sky-500 selection:text-white sm:justify-center sm:pt-0">
      <div>
        <Link href="/">
          <ApplicationLogo className="h-16 w-auto fill-current text-slate-500" />
        </Link>
      </div>

      <div className="mt-6 w-full overflow-hidden bg-slate-800 px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
        {children}
      </div>
    </div>
  );
}