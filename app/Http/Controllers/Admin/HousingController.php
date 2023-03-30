<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Housing;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HousingController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Housing/Index', [
            'housings' => Housing::with('manager.user')->withCount('reviews')->orderBy('name', 'asc')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Housing/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'housing_type' => 'required',
        ]);

        $housing = Housing::create($request->all());

        return redirect()->route('admin.housing.show', $housing->id);
    }

    public function show(int $id)
    {
        $housing = Housing::where('id', $id)->with(['manager.user', 'reviews.user', 'reviews' => function ($query) {
            $query->orderBy('created_at', 'desc')->take(4);
        }, 'revisionHistory' => function ($query) {
            $query->orderBy('created_at', 'desc')->take(5);
        }])->first();
        foreach ($housing->revisionHistory as $item) {
            $user = User::where('id', $item->user_id)->first();
            $item->user = $user;
        }

        return Inertia::render('Admin/Housing/Show', [
            'housing' => $housing,
        ]);
    }

    public function edit(int $id)
    {
        return Inertia::render('Admin/Housing/Edit', [
            'housing' => Housing::find($id),
        ]);
    }

    public function update(Request $request)
    {
        $request->validateWithBag('updateHousingInformation', [
            'bathroom_range' => ['nullable', 'string'],
            'bedroom_range' => ['nullable', 'string'],
            'city' => ['nullable', 'string'],
            'email_address' => ['nullable', 'email'],
            'housing_type' => ['required', 'string', 'max:255'],
            'name' => ['required', 'string', 'max:255'],
            'phone_number' => ['nullable', 'regex:/^([0-9\s\-\+\(\)]*)$/'],
            'postal_code' => ['nullable', 'digits:5'],
            'rent_range' => ['nullable', 'string'],
            'street' => ['nullable', 'string'],
            'website_url' => ['nullable', 'string'],
        ]);

        $housing = Housing::where('id', $request['id'])->first();

        $housing->forceFill([
            'bathroom_range' => $request['bathroom_range'],
            'bedroom_range' => $request['bedroom_range'],
            'city' => $request['city'],
            'email_address' => $request['email_address'],
            'housing_type' => $request['housing_type'],
            'name' => $request['name'],
            'phone_number' => $request['phone_number'],
            'postal_code' => $request['postal_code'],
            'rent_range' => $request['rent_range'],
            'street' => $request['street'],
            'website_url' => $request['website_url'],
        ])->save();

        return $request->wantsJson()
                    ? new JsonResponse('', 200)
                    : redirect()->route('admin.housing.show', $housing->id)->with('status', 'housing-information-updated')
                        ->banner('Profile updated successfully!');
    }
}
