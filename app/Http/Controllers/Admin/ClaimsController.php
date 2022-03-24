<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Claim;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClaimsController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Claims/Index', [
            'claims' => Claim::orderBy('created_at', 'asc')->with(['claimable', 'user'])->get(),
        ]);
    }
}
