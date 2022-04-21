<?php

namespace App\Http\Controllers;

use App\Models\Claim;
use App\Models\Housing;
use App\Enums\ClaimStatus;
use App\Models\Manage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ClaimController extends Controller
{
    public function create(Request $request)
    {
        $housing = Housing::where('id', $request['housing_id'])->first();
        $housing->claim()->save(new Claim([
            'user_id' => auth()->user()->id,
            'street_address' => $request['street_address'],
            'city' => $request['city'],
            'postal_code' => $request['postal_code'],
            'status' => ClaimStatus::PENDING,
        ]));

        return $request->wantsJson()
                    ? new JsonResponse('', 200)
                    : back()->with('status', 'claim-created')
                        ->banner('Claim submitted successsfully');
    }

    public function verify(Request $request)
    {
        $request->validateWithBag('updateClaim', [
            'verification_code' => 'required|string'
        ]);

        $claim = Claim::where('verification_code', $request['verification_code'])->first();

        if (is_null($claim))
        {
            return back()->withErrors(['message' => 'The verification code could not be found']);
        }

        if ($claim->status === ClaimStatus::CLAIMED)
        {
            return back()->withErrors(['message' => 'The verification code has already been used']);
        }

        if ($request->user()->id !== $claim->user_id)
        {
            return back()->withErrors(['message' => 'The verification code is incorrect']);
        }

        $claim->claimable->manager()->save(new Manage([
            'user_id' => auth()->user()->id
        ]));

        $claim->status = ClaimStatus::CLAIMED;
        $claim->save();

        $request->user()->roles()->attach(1);

        return redirect()->route('dashboard')->banner('You now manage ' . $claim->claimable->name);
    }
}
