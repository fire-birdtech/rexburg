import { Head } from '@inertiajs/react';
import MainNav from '@/Components/MainNav';
import Hero from '@/Components/Hero';
import { PageProps } from '@/types';

export default function Welcome({ auth }: PageProps) {
  const { user } = auth;

  return (
    <>
      <Head title="Welcome" />

      <div className="bg-slate-900 bg-dots-lighter selection:bg-sky-500 selection:text-white">
        <MainNav user={user} />
        <Hero />
      </div>
    </>
  );
}
