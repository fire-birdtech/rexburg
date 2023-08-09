<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Models\Amenity;
use App\Models\Housing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

class HousingController extends Controller
{
    public function edit(Housing $housing, Request $request)
    {
        $housing->load(['amenities', 'manager']);

        if ($request->user()->id !== $housing->manager[0]->id) {
            return redirect()->route('errors.404');
        }

        return inertia('StudentHousing/Edit', [
            'housing' => $housing,
            'amenities' => Amenity::orderBy('name', 'asc')->get(),
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }
}
