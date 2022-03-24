<?php

namespace App\Http\Controllers;

use App\Models\Claim;
use App\Models\Housing;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminPagesController extends Controller
{
    public function home()
    {
        return Inertia::render('Admin/Home');
    }
}
