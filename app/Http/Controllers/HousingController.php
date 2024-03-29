<?php

namespace App\Http\Controllers;

use App\Models\Housing;
use Error;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class HousingController extends Controller
{
    public function index(Request $request)
    {
        return inertia('StudentHousing/Index', [
            'housings' => $request->is('student-housing/single')
                ? Housing::singleHousing()->withCount('reviews')->orderBy('name', 'asc')->get()
                : Housing::marriedHousing()->withCount('reviews')->orderBy('name', 'asc')->get(),
            'type' => $request->is('student-housing/single') ? 'single' : 'married',
        ]);
    }

    public function show(Request $request, Housing $housing)
    {
        $housing->views()->create([
            'user_id' => $request->user()?->id ?: null,
        ]);

        return inertia('StudentHousing/Show', [
            'housing' => Housing::where('slug', $housing->slug)->withCount('reviews')->with(['amenities', 'reviews.user', 'reviews' => function ($query) {
                $query->orderBy('created_at', 'desc')->take(4);
            }, 'managers', 'claim'])->first(),
            'isAdmin' => auth()->user() ? $request->user()->hasRole('admin') : false,
            'canEdit' => $request->user()?->can('update', $housing),
        ]);
    }

    /**
     * Delete the housing's cover image
     */
    public function destroyCoverImage(Request $request): RedirectResponse
    {
        try {
            Housing::find($request->id)->deleteCoverImage();

            return back(303)
                ->with('status', 'cover-image-deleted')
                ->banner('Cover image deleted successfully');
        } catch (Error $error) {
        }
    }

    /**
     * Delete the housing's profile image
     */
    public function destroyProfileImage(Request $request): RedirectResponse
    {
        try {
            Housing::find($request->id)->deleteProfileImage();

            return back(303)
                ->with('status', 'profile-image-deleted')
                ->banner('Profile image deleted successfully');
        } catch (Error $error) {
        }
    }
}
