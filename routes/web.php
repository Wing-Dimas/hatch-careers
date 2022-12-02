<?php

use App\Http\Controllers\CatalogController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\RoleController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get("/", function (){return Inertia::render("Homepage", ["title" => "Homepage"]);});

Route::get("/job-list", [CatalogController::class, "index"]);

Route::get("/job-list/{job}", [CatalogController::class, "show"]);

Route::get("/apply/{job}", [CatalogController::class, "create"]);

Route::post("/apply/{job}", [CatalogController::class, "store"]);


// Route::get('/welcome', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::middleware(['auth', 'verified'])->group(function(){
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/dev', function () {
        return Inertia::render('Dev');
    })->name('dev');
    
    // ROLES
    Route::get("/roles", [RoleController::class, "index"])->name("roles");
    Route::post("/roles", [RoleController::class, "store"]);
    Route::get("/roles/{role}/edit", [RoleController::class, "edit"])->name("roles.edit");
    Route::put("/roles/{role}", [RoleController::class, "update"])->name("roles.update");
    Route::delete("/roles/{role}", [RoleController::class, "destroy"])->name("roles.destroy");


    // JOBS
    Route::get('/jobs', [JobController::class, "index"])->name('jobs');
    Route::post('/jobs', [JobController::class, "store"]);
    Route::get('/jobs/{job}/edit', [JobController::class, "edit"])->name("jobs.edit");
    Route::put('/jobs/{job}', [JobController::class, "update"])->name("jobs.update");
    Route::delete('/jobs/{job}', [JobController::class, "destroy"])->name("jobs.destroy");

    Route::get('/applicants', function () {
        return Inertia::render('Applicants');
    })->name('applicants');
    
    Route::get('/users', function () {
        return Inertia::render('Users');
    })->name('users');
});


require __DIR__.'/auth.php';
