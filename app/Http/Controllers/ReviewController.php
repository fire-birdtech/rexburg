<?php

namespace App\Http\Controllers;

use App\Models\Housing;
use App\Models\Review;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function create(Request $request)
    {
        $housing = Housing::where('id', $request['housing_id'])->first();
        $housing->reviews()->save(new Review([
            'user_id' => auth()->user()->id,
            'body' => $request['body'],
            'rating' => $request['rating'],
        ]));

        return $request->wantsJson()
                    ? new JsonResponse('', 200)
                    : back()->with('status', 'claim-created')
                        ->banner('Review submitted successsfully');
    }
}
