<?php

namespace App\Http\Controllers;

use App\Models\Housing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class PagesController extends Controller
{
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

    public function verify()
    {
        return Inertia::render('Verify');
    }
}
