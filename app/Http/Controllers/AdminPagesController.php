<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminPagesController extends Controller
{
    public function home()
    {
        return Inertia::render('Admin/Home');
    }
}
