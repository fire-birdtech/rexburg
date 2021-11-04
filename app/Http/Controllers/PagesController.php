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
            'listing' => Housing::marriedHousing()->withCount('reviews')->with('reviews')->orderBy('name', 'asc')->get(),
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }

    public function housingProfile(Request $request)
    {
        return Inertia::render('StudentHousing/Profile', [
            'housing' => Housing::where('slug', $request->slug)->withCount('reviews')->with(['amenities', 'reviews', 'manager'])->first(),
            'isAdmin' => auth()->user() ? $request->user()->hasRole('admin') : false,
            'canLogin' => Route::has('login'),
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

    public function dashboard()
    {
        return Inertia::render('Dashboard');
    }
}
