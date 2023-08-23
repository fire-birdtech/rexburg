<?php

namespace App\Http\Controllers;

use App\Models\Housing;
use App\Models\Review;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $housing = Housing::find($request->id);
        $housing?->reviews()->save(new Review([
            'user_id' => $request->user()->id,
            'body' => $request['body'],
            'rating' => $request['rating'],
        ]));

        if ($request['livedHere'] === 'Yes') {
            $housing?->users()->attach($request->user()->id);
        }

        return back()->with('notification', 'Review submitted successfully');
    }
}
