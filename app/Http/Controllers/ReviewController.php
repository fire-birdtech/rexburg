<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ReviewController extends Controller
{
    protected $fillable = [
        'body',
        'rating',
        'reviewable_id',
        'reviewable_type',
        'user_id',
    ];
}
