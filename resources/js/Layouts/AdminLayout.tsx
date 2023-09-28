import { PropsWithChildren } from 'react';
import AdminNav from '@/Components/AdminNav';
import { User } from '@/types';

export default function Admin({ user, children }: PropsWithChildren<{ user: User }>) {
  return (
    <div className="min-h-screen bg-slate-50 bg-dots-lighter selection:bg-sky-500 selection:text-white dark:bg-slate-900">
      <AdminNav user={user} />

      <div className="lg:pl-72">
        <main className="py-4 lg:py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
