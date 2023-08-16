<?php

use App\Http\Controllers\Admin\ClaimsController as AdminClaimsController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\HousingController as AdminHousingController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'verified', 'admin'])->prefix('admin')->group(function() {
    Route::name('admin.')->group(function() {
        Route::get('dashboard', [DashboardController::class, 'main'])->name('dashboards.main');
        Route::prefix('housing')->name('housing.')->group(function() {
            Route::get('/', [AdminHousingController::class, 'index'])->name('index');
            Route::get('create', [AdminHousingController::class, 'create'])->name('create');
            Route::post('store', [AdminHousingController::class, 'store'])->name('store');
            Route::get('{id}', [AdminHousingController::class, 'show'])->name('show');
            Route::post('{id}', [AdminHousingController::class, 'update'])->name('update');
            Route::get('{id}/edit', [AdminHousingController::class, 'edit'])->name('edit');
        });
        Route::prefix('users')->name('users.')->group(function () {
            Route::get('/', [AdminUserController::class, 'index'])->name('index');
            Route::get('{id}', [AdminUserController::class, 'show'])->name('show');
            Route::post('/{id}/suspend', [AdminUserController::class, 'suspend'])->name('suspend');
            Route::delete('{user}', [AdminUserController::class, 'destroy'])->name('delete');
        });
        Route::prefix('claims')->name('claims.')->group(function () {
            Route::get('/', [AdminClaimsController::class, 'index'])->name('index');
            Route::get('{id}', [AdminClaimsController::class, 'show'])->name('show');
            Route::post('{id}', [AdminClaimsController::class, 'approve'])->name('approve');
            Route::delete('{id}', [AdminClaimsController::class, 'reject'])->name('reject');
        });
    });
});
