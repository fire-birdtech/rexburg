<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PagesController extends Controller
{
    public function dashboard(Request $request)
    {
        return inertia('Manager/Dashboard', [
            'manages' => $request->user()->manages,
        ]);
    }
}
