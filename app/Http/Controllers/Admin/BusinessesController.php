<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Business;
use Inertia\Response;

class BusinessesController extends Controller
{
    public function index(): Response
    {
        return inertia('Admin/Businesses/Index', [
            'businesses' => Business::withCount('reviews')->orderBy('name', 'asc')->get(),
        ]);
    }

    public function show(Business $business): Response
    {
        return inertia('Admin/Businesses/Show', [
            'business' => $business->load(['managers', 'reviews.user', 'reviews' => function ($query) {
                $query->orderBy('created_at', 'desc')->take(4);
            }, 'revisionHistory' => function ($query) {
                $query->orderBy('created_at', 'desc')->take(5);
            }]),
        ]);
    }
}
