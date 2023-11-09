<?php

namespace App\Http\Controllers;

use Inertia\Response;
use Laravel\Pennant\Middleware\EnsureFeaturesAreActive;

class BusinessController extends Controller
{
    public function __construct()
    {
        $this->middleware(EnsureFeaturesAreActive::using('businesses'));
    }

    public function index(): Response
    {
        return inertia('Businesses/Index');
    }
}