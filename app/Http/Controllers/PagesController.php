<?php

namespace App\Http\Controllers;

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

    public function housingProfile()
    {
        return Inertia::render('StudentHousing/Profile', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }

    public function dashboard()
    {
        return Inertia::render('Dashboard');
    }
}
