<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureUserIsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @return mixed
     */
    public function handle(Request $request, Closure $next): mixed
    {
        if (! $request->user()->hasRole('admin')) {
            return redirect()->route('errors.404');
        }

        return $next($request);
    }
}
