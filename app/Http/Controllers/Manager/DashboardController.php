<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Models\Housing;
use App\Models\Review;
use App\Models\View;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Response;
use Inertia\ResponseFactory;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response|ResponseFactory
    {
        $housings = $request->user()->managedHousings;
        $range = CarbonPeriod::create(now()->subDays(8), now()->subDay());
        $views = [];
        $reviews = null;
        foreach ($range as $date) {
            $views[] = [
                'Day' => $date->format('M d'),
            ];
        }
        foreach ($housings as $housing) {
            $housingViews = View::select([
                DB::raw('count(*) as count'),
                DB::raw('DATE(created_at) as day'),
            ])
                ->where([
                    ['viewable_id', $housing->id],
                    ['viewable_type', Housing::class],
                    ['created_at', '!=', Carbon::now()],
                    ['created_at', '>', Carbon::now()->subDays(8)],
                ])
                ->groupBy('day')
                ->get();
            foreach ($range as $key => $date) {
                if ($housingViews->doesntContain('day', $date->format('Y-m-d'))) {
                    $views[$key][$housing->name] = 0;
                } else {
                    $views[$key][$housing->name] = $housingViews->where('day', $date->format('Y-m-d'))->first()->getAttribute('count');
                }
            }

            $reviews[] = [
                'name' => $housing->name,
                'score' => $housing->score,
                'total' => Review::where([
                    ['reviewable_id', $housing->id],
                    ['reviewable_type', Housing::class],
                ])->count(),
                'data' => Review::select([
                    DB::raw('count(*) as total'),
                    'rating'
                ])
                    ->where([
                        ['reviewable_id', $housing->id],
                        ['reviewable_type', Housing::class],
                    ])
                    ->groupBy('rating')
                    ->orderBy('rating')
                    ->get(),
            ];
        }

        return inertia('Manager/Dashboard', [
            'housings' => $housings,
            'reviews' => $reviews,
            'views' => $views,
        ]);
    }
}
