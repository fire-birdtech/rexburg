<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Housing;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HousingController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Housing/Index', [
            'housings' => Housing::with('manager.user')->withCount('reviews')->orderBy('name', 'asc')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Housing/Create');
    }

    public function show(int $id)
    {
        $housing = Housing::where('id', $id)->with(['manager.user', 'reviews.user', 'reviews' => function($query) {
            $query->orderBy('created_at', 'desc')->take(4);
        }, 'revisionHistory' => function($query) {
            $query->orderBy('created_at', 'desc')->take(5);
        }])->first();
        foreach ($housing->revisionHistory as $item) {
            $user = User::where('id', $item->user_id)->first();
            $item->user = $user;
        }

        return Inertia::render('Admin/Housing/Show', [
            'housing' => $housing,
        ]);
    }

    public function edit(int $id)
    {
        return Inertia::render('Admin/Housing/Edit', [
            'housing' => Housing::find($id)
        ]);
    }
}
