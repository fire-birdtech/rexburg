<?php

use App\Http\Controllers\BusinessController;
use App\Http\Controllers\ClaimController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HousingController;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\PrivacyPolicyController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\TermsOfServiceController;
use Illuminate\Http\Request;
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

Route::get('/', function (Request $request) {
    return inertia('Welcome');
})->name('welcome');

Route::get('privacy-policy', PrivacyPolicyController::class)->name('privacy-policy');
Route::get('terms-of-service', TermsOfServiceController::class)->name('terms-of-service');

Route::get('student-housing/single', [HousingController::class, 'index'])->name('housing.single');
Route::get('student-housing/married', [HousingController::class, 'index'])->name('housing.married');
Route::get('student-housing/{housing}', [HousingController::class, 'show'])->name('housing.show');
Route::get('student-housing/{slug}/reviews', [PagesController::class, 'housingReviews'])->name('housing.reviews');

Route::prefix('businesses')
    ->name('businesses.')
    ->controller(BusinessController::class)->group(function () {
        Route::get('/', 'index')->name('index');
    });

Route::get('/dashboard', DashboardController::class)->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/verify', [PagesController::class, 'verify'])->name('claims.verify');
    Route::patch('/verify', [ClaimController::class, 'verify'])->name('claims.verify.update');

    Route::post('reviews', [ReviewController::class, 'store'])->name('reviews.create');
});

require __DIR__.'/auth.php';

require __DIR__.'/admin.php';

require __DIR__.'/manager.php';

Route::get('404', function () {
    return inertia('Errors/404');
})->name('errors.404');
