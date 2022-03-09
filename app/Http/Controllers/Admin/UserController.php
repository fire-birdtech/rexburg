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
}
