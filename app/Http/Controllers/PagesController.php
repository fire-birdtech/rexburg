<?php

namespace App\Http\Controllers;

use App\Models\Amenity;
use App\Models\Housing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class PagesController extends Controller
{
    public function home()
    {
        return Inertia::render('Home', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }

    public function singleList()
    {
        return Inertia::render('StudentHousing/List', [
            'housings' => Housing::singleHousing()->withCount('reviews')->orderBy('name', 'asc')->get(),
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'type' => 'single',
        ]);
    }

    public function marriedList()
    {
        return Inertia::render('StudentHousing/List', [
            'housings' => Housing::marriedHousing()->withCount('reviews')->orderBy('name', 'asc')->get(),
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'type' => 'married',
        ]);
    }

    public function housingReviews(Request $request)
    {
        return Inertia::render('StudentHousing/Reviews', [
            'housing' => Housing::where('slug', $request->slug)->withCount('reviews')->with(['reviews.user', 'reviews' => function ($query) {
                $query->orderBy('created_at', 'desc');
            }])->first(),
            'caLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }

    public function dashboard(Request $request)
    {
        return Inertia::render('Dashboard', [
            'claims' => $request->user()->claims()->approved()->count(),
            'housings' => auth()->user()->housings,
            'manages' => $request->user()->manages,
            'reviews' => auth()->user()->reviews->take(3),
        ]);
    }

    public function verify()
    {
        return Inertia::render('Verify');
    }
}
