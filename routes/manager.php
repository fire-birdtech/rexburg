<?php

use App\Http\Controllers\Manager\HousingController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'verified', 'manager'])->group(function () {
    Route::get('student-housing/{housing}/edit', [HousingController::class, 'edit'])->name('housing.edit');
    Route::put('student-housing', [HousingController::class, 'update'])->name('housing.update');
    Route::delete('student-housing/{id}/cover', [HousingController::class, 'destroyCoverImage'])->name('housing-cover-image.destroy');
    Route::delete('student-housing/{id}/profile', [HousingController::class, 'destroyProfileImage'])->name('housing-profile-image.destroy');
});
