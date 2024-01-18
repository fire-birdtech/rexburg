<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\AdminDashboardDataService;
use Inertia\Response;
use Inertia\ResponseFactory;

class DashboardController extends Controller
{
    public function main(AdminDashboardDataService $service): Response|ResponseFactory
    {
        return inertia('Admin/Dashboards/Main', [
            'views' => $service->getLastThirtyDaysProfileViews(),
            'topViews' => $service->getTopViewedProfiles(),
        ]);
    }
}
