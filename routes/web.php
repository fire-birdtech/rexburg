<?php

use App\Http\Controllers\ClaimController;
use App\Http\Controllers\HousingController;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\Admin\ClaimsController as AdminClaimsController;
use App\Http\Controllers\Admin\HousingController as AdminHousingController;
use App\Http\Controllers\Admin\PagesController as AdminPagesController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Manager\PagesController as ManagerPagesController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [PagesController::class, 'home'])->name('home');
Route::get('student-housing/single', [PagesController::class, 'singleList'])->name('housing.single');
Route::get('student-housing/married', [PagesController::class, 'marriedList'])->name('housing.married');
Route::get('student-housing/{slug}', [PagesController::class, 'housingProfile'])->name('housing.profile');
Route::get('student-housing/{slug}/reviews', [PagesController::class, 'housingReviews'])->name('housing.reviews');

Route::middleware(['auth:sanctum', 'verified', 'manager'])->group(function () {
    Route::get('student-housing/{slug}/edit', [PagesController::class, 'housingProfileEdit'])->name('housing.profile.edit');
    Route::put('student-housing', [HousingController::class, 'update'])->name('housing.profile.update');
    Route::delete('student-housing/{id}/cover', [HousingController::class, 'destroyCoverImage'])->name('housing-cover-image.destroy');
    Route::delete('student-housing/{id}/profile', [HousingController::class, 'destroyProfileImage'])->name('housing-profile-image.destroy');
});

Route::middleware(['auth:sanctum', 'verified'])->group(function() {
    Route::get('/dashboard', [PagesController::class, 'dashboard'])->name('dashboard');
    Route::post('claim', [ClaimController::class, 'create'])->name('claims.create');
    Route::post('review', [ReviewController::class, 'create'])->name('reviews.create');
    Route::get('/verify', [PagesController::class, 'verify'])->name('claims.verify');
    Route::patch('/verify', [ClaimController::class, 'verify'])->name('claims.verify.update');
});

Route::middleware(['auth:sanctum', 'verified', 'manager'])->group(function() {
    Route::prefix('manager')->name('manager.')->group(function() {
        Route::get('/', [ManagerPagesController::class, 'dashboard'])->name('dashboard');
    });
});

Route::middleware(['auth:sanctum', 'verified', 'admin'])->prefix('admin')->group(function() {
    Route::name('admin.')->group(function() {
        Route::get('/', [AdminPagesController::class, 'home'])->name('home');
        Route::prefix('housing')->name('housing.')->group(function() {
            Route::get('/', [AdminHousingController::class, 'index'])->name('index');
            Route::get('create', [AdminHousingController::class, 'create'])->name('create');
            Route::post('store', [HousingController::class, 'store'])->name('store');
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

Route::get('404', function () {
    return inertia('Errors/404');
})->name('errors.404');
