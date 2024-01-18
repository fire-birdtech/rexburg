<?php

namespace App\Services;

use App\Models\Housing;
use App\Models\View;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Support\Facades\DB;

class AdminDashboardDataService
{
    public function getLastThirtyDaysProfileViews(): array
    {
        $range = CarbonPeriod::create(now()->subDays(30), now()->subDay());
        $views = [];
        foreach ($range as $date) {
            $views[] = [
                'Day' => $date->format('M d'),
            ];
        }
        $profileViews = View::select([
            DB::raw('count(*) as count'),
            DB::raw('DATE(created_at) as day'),
        ])
            ->where([
                ['created_at', '!=', Carbon::now()],
                ['created_at', '>', Carbon::now()->subDays(30)],
            ])
            ->groupBy('day')
            ->get();
        foreach ($range as $key => $date) {
            if ($profileViews->doesntContain('day', $date->format('Y-m-d'))) {
                $views[$key]['Views'] = 0;
            } else {
                $views[$key]['Views'] = $profileViews->where('day', $date->format('Y-m-d'))->first()->getAttribute('count');
            }
        }

        return $views;
    }

    public function getTopViewedProfiles(): array
    {
        $views = [];

        $topViews = View::query()
            ->selectRaw('count(*) as value, housings.name')
            ->join('housings', function ($join) {
                $join->on('viewable_id', '=', 'housings.id')
                    ->where('viewable_type', '=', Housing::class);
            })
            ->whereDate('views.created_at', '!=', Carbon::now())
            ->whereDate('views.created_at', '>', Carbon::now()->subDays(30))
            ->groupBy(['viewable_type', 'viewable_id'])
            ->orderByDesc('value')
            ->take(4)
            ->get();

        foreach ($topViews as $topView) {
            $views[] = $topView;
        }

        return $views;
    }
}
