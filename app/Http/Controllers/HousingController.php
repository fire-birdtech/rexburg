<?php

namespace App\Http\Controllers;

use App\Models\Housing;
use Error;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class HousingController extends Controller
{
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
                    : back()->with('status', 'housing-information-updated')
                        ->banner('Profile updated successfully!');
    }

    /**
     * Delete the housing's cover image
     * 
     * @param Request $request
     * @return RedirectResponse
     */
    public function destroyCoverImage(Request $request): RedirectResponse
    {
        try {
            Housing::find($request->id)->deleteCoverImage();

            return back(303)
                    ->with('status', 'cover-image-deleted')
                    ->banner('Cover image deleted successfully');
        } catch (Error $error) { }
    }

    /**
     * Delete the housing's profile image
     * 
     * @param Request $request
     * @return RedirectResponse
     */
    public function destroyProfileImage(Request $request): RedirectResponse
    {
        try {
            Housing::find($request->id)->deleteProfileImage();

            return back(303)
                    ->with('status', 'profile-image-deleted')
                    ->banner('Profile image deleted successfully');
        } catch (Error $error) { }
    }
}
