<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlockedEmail;
use App\Models\User;
use App\Models\UserSuspension;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return inertia('Admin/Users/Index', [
            'users' => User::orderBy('name', 'asc')->get(),
        ]);
    }

    public function show(int $id)
    {
        return inertia('Admin/Users/Show', [
            'user' => User::where('id', $id)->withCount(['reviews', 'suspensions'])->with(['suspensions'])->first(),
        ]);
    }

    public function suspend(Request $request)
    {
        $user = User::where('id', $request->user_id)->firstOrFail();
        $user->suspended_until = Carbon::now()->addWeeks(1);
        $user->save();

        UserSuspension::create([
            'user_id' => $user->id,
            'reason' => 'Donec pharetra, orci vel accumsan.',
        ]);

        return back();
    }

    public function destroy(User $user): RedirectResponse
    {
        BlockedEmail::create([
            'email' => $user->email,
        ]);

        $user->delete();

        return redirect()->route('admin.users.index')->with('notification', 'User deleted successfully.');
    }
}
