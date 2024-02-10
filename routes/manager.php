<?php

use App\Http\Controllers\ClaimController;
use App\Http\Controllers\Manager\DashboardController;
use App\Http\Controllers\Manager\HousingController;
use Illuminate\Support\Facades\Route;
use Laravel\Pennant\Middleware\EnsureFeaturesAreActive;

Route::prefix('manager')->middleware(['auth', 'verified'])->group(function () {
    Route::get('claim', [ClaimController::class, 'index'])->name('claims.index');
    Route::get('claim/business', [ClaimController::class, 'businessIndex'])
        ->name('claims.business.index')
        ->middleware(EnsureFeaturesAreActive::using('businesses'));
    Route::post('claim', [ClaimController::class, 'store'])->name('claims.store');
    Route::put('claim', [ClaimController::class, 'verify'])->name('claims.verify');
});
Route::middleware(['auth', 'verified', 'manager'])->group(function () {
    Route::get('manager/dashboard', DashboardController::class)->name('manager.dashboard');
    Route::get('student-housing/{housing}/edit', [HousingController::class, 'edit'])->name('housing.edit');
    Route::put('student-housing', [HousingController::class, 'update'])->name('housing.update');
    Route::delete('student-housing/{id}/cover', [HousingController::class, 'destroyCoverImage'])->name('housing-cover-image.destroy');
    Route::delete('student-housing/{id}/profile', [HousingController::class, 'destroyProfileImage'])->name('housing-profile-image.destroy');
});
