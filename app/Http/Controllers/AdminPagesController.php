<?php

namespace App\Http\Controllers;

use App\Models\Claim;
use App\Models\Housing;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminPagesController extends Controller
{
    public function home()
    {
        return Inertia::render('Admin/Home');
    }

    public function housing()
    {
        return Inertia::render('Admin/Housing/Index', [
            'housings' => Housing::with('manager.user')->withCount('reviews')->orderBy('name', 'asc')->get(),
        ]);
    }

    public function housing_create()
    {
        return Inertia::render('Admin/Housing/Create');
    }
}
