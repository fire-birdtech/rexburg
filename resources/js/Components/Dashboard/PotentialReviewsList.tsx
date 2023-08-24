import { Link } from '@inertiajs/react';
import { View } from '@/types';

export default function PotentialReviewsList({ views }: { views: View[] }) {
  return (
    <div>
      <h3 className="text-base font-semibold leading-6 text-slate-100">Are you able to review these places?</h3>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {views.map((view) => (
          <div
            key={view.id}
            className="group relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-slate-800 px-6 pb-6 pt-12"
          >
            <img src={view.viewable.cover_image_url} alt={view.viewable.name} className="absolute inset-0 -z-10 h-full w-full object-cover" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-800 via-slate-800/60 transition duration-200 ease-in-out group-hover:from-slate-700" />
            <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-slate-800/10" />

            <div className="flex flex-wrap items-center gap-y-1 overflow-hidden">
              <div className="-ml-4 flex items-center gap-x-4">
                <svg viewBox="0 0 2 2" className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                  <circle cx={1} cy={1} r={1} />
                </svg>
              </div>
            </div>
            <h3 className="mt-3 text-xl font-semibold leading-6 text-white">
              {view.viewable.name}
            </h3>
            <Link href={route('housing.show', view.viewable)} className="mt-2 text-sm font-semibold leading-6 text-slate-300 transition duration-150 ease-in-out hover:text-white">
              <span className="absolute inset-0" />
              Leave a review &rarr;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
