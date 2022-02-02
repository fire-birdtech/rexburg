<?php

use App\Http\Controllers\AdminPagesController;
use App\Http\Controllers\ClaimController;
use App\Http\Controllers\HousingController;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\ReviewController;
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

Route::middleware(['auth:sanctum', 'verified', 'adminOrManager'])->group(function () {
    Route::get('student-housing/{slug}/edit', [PagesController::class, 'housingProfileEdit'])->name('housing.profile.edit');
    Route::put('student-housing', [HousingController::class, 'update'])->name('housing.profile.update');
});

Route::middleware(['auth:sanctum', 'verified'])->group(function() {
    Route::get('/dashboard', [PagesController::class, 'dashboard'])->name('dashboard');
    Route::post('claim', [ClaimController::class, 'create'])->name('claims.create');
    Route::post('review', [ReviewController::class, 'create'])->name('reviews.create');
    Route::get('/verify', [PagesController::class, 'verify'])->name('claims.verify');
    Route::patch('/verify', [ClaimController::class, 'verify'])->name('claims.verify.update');
});


Route::middleware(['auth:sanctum', 'verified', 'admin'])->prefix('admin')->group(function() {
    Route::name('admin.')->group(function() {
        Route::get('/', [AdminPagesController::class, 'home'])->name('home');
        Route::prefix('housing')->name('housing.')->group(function() {
            Route::get('/', [AdminPagesController::class, 'housing'])->name('index');
            Route::get('create', [AdminPagesController::class, 'housing_create'])->name('create');
            Route::post('store', [HousingController::class, 'store'])->name('store');
        });
        Route::get('/claims', [AdminPagesController::class, 'claims'])->name('claims.index');
    });
});
