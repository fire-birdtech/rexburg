<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response|ResponseFactory
    {
        return inertia('Manager/Dashboard', [
            'manages' => $request->user()->manages,
        ]);
    }
}
