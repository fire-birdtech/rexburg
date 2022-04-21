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

    public function show(int $id)
    {
        return Inertia::render('Admin/Claims/Show', [
            'claim' => Claim::where('id', $id)->with(['claimable', 'user'])->firstOrFail(),
        ]);
    }

    public function approve(int $id)
    {
        return 'Approved. Send postcard';
    }
}
