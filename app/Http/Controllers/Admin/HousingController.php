<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Housing;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HousingController extends Controller
{
    public function show($id)
    {
        return Inertia::render('Admin/Housing/Show', [
            'housing' => Housing::where('id', $id)->with(['manager.user', 'reviews.user', 'reviews' => function($query) {
                $query->orderBy('created_at', 'desc')->take(4);
            }])->first(),
        ]);
    }
}
