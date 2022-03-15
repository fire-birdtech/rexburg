<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return inertia('Admin/Users/Index', [
            'users' => User::orderBy('name', 'asc')->get()
        ]);
    }

    public function show(int $id)
    {
        return inertia('Admin/Users/Show', [
            'user' => User::where('id', $id)->withCount('reviews')->first()
        ]);
    }
}
