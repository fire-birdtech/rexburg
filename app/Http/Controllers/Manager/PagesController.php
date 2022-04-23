<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;

class PagesController extends Controller
{
    public function dashboard()
    {
        return inertia('Manager/Dashboard');
    }
}