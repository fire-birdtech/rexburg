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
            'housing' => Housing::singleHousing()->withCount('reviews')->orderBy('name', 'asc')->get(),
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }

    public function marriedList()
    {
        return Inertia::render('StudentHousing/List', [
            'housing' => Housing::marriedHousing()->withCount('reviews')->orderBy('name', 'asc')->get(),
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }

    public function housingProfile(Request $request)
    {
        return Inertia::render('StudentHousing/Profile', [
            'housing' => Housing::where('slug', $request->slug)->withCount('reviews')->with(['amenities', 'reviews.user', 'reviews' => function($query) {
                $query->orderBy('created_at', 'desc')->take(4);
            }, 'manager', 'claim'])->first(),
            'isAdmin' => auth()->user() ? $request->user()->hasRole('admin') : false,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }

    public function housingReviews(Request $request)
    {
        return Inertia::render('StudentHousing/Reviews', [
            'housing' => Housing::where('slug', $request->slug)->withCount('reviews')->with(['reviews.user', 'reviews' => function($query) {
                $query->orderBy('created_at', 'desc');
            }])->first(),
            'caLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }

    public function housingProfileEdit(Request $request)
    {
        return Inertia::render('StudentHousing/Edit', [
            'housing' => Housing::where('slug', $request->slug)->with('amenities')->first(),
            'amenities' => Amenity::orderBy('name', 'asc')->get(),
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }

    public function dashboard(Request $request)
    {
        return Inertia::render('Dashboard', [
            'claims' => $request->user()->claims()->pending()->count(),
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
