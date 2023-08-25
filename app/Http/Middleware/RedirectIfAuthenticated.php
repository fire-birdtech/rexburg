<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  string|null  ...$guards
     * @return mixed
     */
    public function handle(Request $request, Closure $next, ...$guards)
    {
        $guards = empty($guards) ? [null] : $guards;

        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {
                if ($request->user()->hasRole('admin')) {
                    return redirect(RouteServiceProvider::ADMINHOME);
                }
                if ($request->user()->hasRole('manager')) {
                    return redirect(RouteServiceProvider::MANAGERHOME);
                }

                return redirect(RouteServiceProvider::HOME);
            }
        }

        return $next($request);
    }
}
