<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\ServiceProvider;
use Laravel\Pennant\Feature;
use Laravel\Pennant\Middleware\EnsureFeaturesAreActive;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Feature::define('businesses', fn (User $user) => match (true) {
            $user->hasRole('admin') => true,
            $user->doesntHaveRole('admin') => false,
        });

        EnsureFeaturesAreActive::whenInactive(
            function (Request $request, array $features) {
                return redirect()->route('errors.404');
            }
        );
    }
}
