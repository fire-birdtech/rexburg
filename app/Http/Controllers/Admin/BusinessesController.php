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
}
