import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import MainNav from "@/Components/MainNav";
import Hero from "@/Components/Hero";

export default function Welcome({ auth }: PageProps) {
  return (
    <>
      <Head title="Welcome" />

      <div className="bg-dots-darker bg-slate-900 selection:bg-sky-500 selection:text-white">
        <MainNav auth={auth} />
        <Hero />
      </div>
    </>
  );
}
