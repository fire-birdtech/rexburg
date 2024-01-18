<?php

namespace App\Services;

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
}
