<?php

namespace App\Http\Controllers;

use App\Enums\ClaimStatus;
use App\Http\Requests\ClaimVerifyRequest;
use App\Models\Claim;
use App\Models\Housing;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;

class ClaimController extends Controller
{
    public function index(): Response|ResponseFactory
    {
        return inertia('Manager/Claim', [
            'claimables' => Housing::doesntHave('claim')->doesntHave('managers')->orderBy('name', 'asc')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $housing = Housing::find($request->id);
        $housing?->claim()->save(new Claim([
            'user_id' => $request->user()->id,
            'street_address' => $request['street_address'],
            'city' => $request['city'],
            'postal_code' => $request['postal_code'],
            'status' => ClaimStatus::PENDING,
        ]));

        return back()->with('notification', 'Claim submitted successfully!');
    }

    public function verify(ClaimVerifyRequest $request)
    {
        $claim = Claim::where('verification_code', $request['verification_code'])->first();

        if (is_null($claim)) {
            return back()->withErrors(['message' => 'The verification code could not be found']);
        }

        if ($claim->status === ClaimStatus::CLAIMED) {
            return back()->withErrors(['message' => 'The verification code has already been used']);
        }

        if ($request->user()->id !== $claim->user_id) {
            return back()->withErrors(['message' => 'The verification code is incorrect']);
        }

        $claim->claimable->managers()->save($request->user());

        $claim->status = ClaimStatus::CLAIMED;
        $claim->save();

        $request->user()->roles()->attach(1);

        return redirect()->route('manager.dashboard')->with('notification', "You now manage {$claim->claimable->name}.");
    }
}
