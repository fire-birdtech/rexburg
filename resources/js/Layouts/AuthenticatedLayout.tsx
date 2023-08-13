import { PropsWithChildren } from 'react';
import MainNav from '@/Components/MainNav';
import { User } from '@/types';

export default function Authenticated({ user, children }: PropsWithChildren<{ user: User }>) {
  return (
    <div className="bg-slate-900 bg-dots-lighter selection:bg-sky-500 selection:text-white">
      <MainNav user={user} />

      <main className="py-20">
        {children}
      </main>
    </div>
  );
}
