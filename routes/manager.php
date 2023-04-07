<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'verified', 'manager'])->group(function () {
    Route::get('student-housing/{slug}/edit', [PagesController::class, 'housingProfileEdit'])->name('housing.profile.edit');
    Route::put('student-housing', [HousingController::class, 'update'])->name('housing.profile.update');
    Route::delete('student-housing/{id}/cover', [HousingController::class, 'destroyCoverImage'])->name('housing-cover-image.destroy');
    Route::delete('student-housing/{id}/profile', [HousingController::class, 'destroyProfileImage'])->name('housing-profile-image.destroy');
});