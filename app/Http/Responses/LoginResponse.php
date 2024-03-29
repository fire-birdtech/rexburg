<?php

namespace App\Http\Responses;

use App\Providers\RouteServiceProvider;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
{
    /**
     * Create an HTTP response that represents the object.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function toResponse($request)
    {
        if ($request->user()->hasRole('admin')) {
            return redirect()->intended(RouteServiceProvider::ADMINHOME);
        }

        if ($request->user()->hasRole('manager')) {
            return redirect()->intended(RouteServiceProvider::MANAGERHOME);
        }

        return redirect()->intended(RouteServiceProvider::HOME);
    }
}
