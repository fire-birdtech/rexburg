<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public function main()
    {
        return inertia('Admin/Dashboards/Main');
    }
}
