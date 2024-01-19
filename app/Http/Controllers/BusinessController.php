<?php

namespace App\Http\Controllers;

use App\Models\Business;
use Illuminate\Http\Request;
use Inertia\Response;
use Laravel\Pennant\Middleware\EnsureFeaturesAreActive;

class BusinessController extends Controller
{
    public function __construct()
    {
        $this->middleware(EnsureFeaturesAreActive::using('businesses'));
    }

    public function index(): Response
    {
        return inertia('Businesses/Index', [
            'businesses' => Business::orderBy('name', 'desc')->get(),
        ]);
    }

    public function show(Request $request, Business $business): Response
    {
        $business->views()->create([
            'user_id' => $request->user()?->id ?: null,
        ]);

        return inertia('Businesses/Show', [
            'business' => $business,
        ]);
    }
}
