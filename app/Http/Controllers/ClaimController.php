<?php

namespace App\Http\Controllers;

use App\Models\Claim;
use App\Models\Housing;
use App\Enums\ClaimStatus;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ClaimController extends Controller
{
    public function create(Request $request)
    {
        $housing = Housing::where('id', $request['housing_id'])->first();
        $housing->claim()->save(new Claim([
            'user_id' => auth()->user()->id,
            'status' => ClaimStatus::PENDING,
        ]));

        return $request->wantsJson()
                    ? new JsonResponse('', 200)
                    : back()->with('status', 'claim-created')
                        ->banner('Claim submitted successsfully');
    }
}
