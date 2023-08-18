<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Models\Amenity;
use App\Models\Housing;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

class HousingController extends Controller
{
    public function edit(Housing $housing, Request $request)
    {
        $housing->load(['amenities', 'managers']);

        if ($request->user()->cannot('update', $housing)) {
            return redirect()->route('errors.404');
        }

        return inertia('StudentHousing/Edit', [
            'housing' => $housing,
            'availableAmenities' => Amenity::orderBy('name', 'asc')->get(),
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }

    public function update(Request $request)
    {
        $request->validateWithBag('updateHousingInformation', [
            'about' => ['nullable', 'string', 'max:1000'],
            'bathroom_range' => ['nullable', 'string'],
            'bedroom_range' => ['nullable', 'string'],
            'byui_approved' => ['nullable', 'boolean'],
            'city' => ['nullable', 'string'],
            'email_address' => ['nullable', 'email'],
            'cover' => ['nullable', 'mimes:jpg,jpeg,png', 'max:1024'],
            'housing_type' => ['required', 'string', 'max:255'],
            'name' => ['required', 'string', 'max:255'],
            'phone_number' => ['nullable', 'regex:/^([0-9\s\-\+\(\)]*)$/'],
            'postal_code' => ['nullable', 'digits:5'],
            'profile' => ['nullable', 'mimes:jpg,jpeg,png', 'max:1024'],
            'rent_range' => ['nullable', 'string'],
            'street' => ['nullable', 'string'],
            'website_url' => ['nullable', 'string'],
        ]);

        $housing = Housing::where('id', $request['id'])->first();

        if (null !== $request->file('profile')) {
            $housing->updateProfileImage($request->file('profile'));
        }
        if (null !== $request->file('cover')) {
            $housing->updateCoverImage($request->file('cover'));
        }

        if (isset($request['byui_approved']) && $request['housing_type'] === 'married') {
            $request['byui_approved'] = null;
        }

        $housing->amenities()->sync($request['updatedAmenities']);

        $housing->forceFill([
            'about' => $request['about'],
            'bathroom_range' => $request['bathroom_range'],
            'bedroom_range' => $request['bedroom_range'],
            'byui_approved' => $request['byui_approved'],
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
                    : back()->with('status', 'housing-information-updated');
        // ->banner('Profile updated successfully!');
    }
}
