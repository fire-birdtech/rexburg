type StatisticItemProps = {
  name: string;
  stat: string;
}

export default function StatisticItem({ name, stat }: StatisticItemProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-600 bg-slate-900 px-4 py-5 shadow sm:p-6">
      <div className="truncate text-sm font-medium text-slate-400">
        {name}
      </div>
      <div className="mt-1 text-3xl font-semibold tracking-tight text-slate-200">
        {stat}
      </div>
    </div>
  );
}
