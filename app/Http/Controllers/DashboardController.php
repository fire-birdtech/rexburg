<?php

namespace App\Http\Controllers;

use App\Models\View;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response|ResponseFactory
    {
        $views = View::where('user_id', $request->user()->id)->with(['viewable' => function ($viewable) {
            $viewable->select('id', 'name', 'slug')->with(['reviews' => function ($reviews) {
                return $reviews->select(['user_id']);
            }]);
        }])->latest()->get()->unique('viewable_id');

        return inertia('Dashboard', [
            'claims' => $request->user()->claims->load('claimable'),
            'views' => $views->flatten(),
        ]);
    }
}
