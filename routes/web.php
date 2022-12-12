<?php

use App\Http\Controllers\ApplicantController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Models\Applicant;
use App\Models\Job;
use App\Models\User;
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

Route::post("/contact", [ContactController::class, "sendEmail"])->name("contact");

Route::get("/job-list", [CatalogController::class, "index"]);

Route::get("/job-list/{job}", [CatalogController::class, "show"]);

Route::get("/apply/{job}", [CatalogController::class, "create"]);

Route::post("/apply/{job}", [CatalogController::class, "store"]);


Route::middleware(['auth', 'verified'])->group(function(){
    Route::get('/dashboard', function () {
        $applicants = Applicant::get()->count();
        $users = User::get()->count();
        $jobOpen = Job::whereStatus("open")->get()->count();
        $jobClose = Job::whereStatus("close")->get()->count();
        return Inertia::render('Dashboard', compact("applicants", "users", "jobOpen", "jobClose"));
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

    // USERS
    Route::get('/users', [UserController::class, "index"] )->name('users');
    Route::post('/users', [UserController::class, "store"] );
    Route::get('/users/{user}/edit', [UserController::class, "edit"])->name("users.edit");
    Route::put('/users/{user}', [UserController::class, "update"])->name("users.update");
    Route::delete('/users/{user}', [UserController::class, "destroy"])->name("users.destroy");

    // JOBS
    Route::get('/jobs', [JobController::class, "index"])->name('jobs');
    Route::post('/jobs', [JobController::class, "store"]);
    Route::get('/jobs/{job}/edit', [JobController::class, "edit"])->name("jobs.edit");
    Route::put('/jobs/{job}', [JobController::class, "update"])->name("jobs.update");
    Route::delete('/jobs/{job}', [JobController::class, "destroy"])->name("jobs.destroy");

    // APPLICANTS
    Route::get('/applicants', [ApplicantController::class, "index"])->name('applicants');
    Route::get('applicants/{applicant}', [ApplicantController::class, "show"])->name("applicants.show");
    Route::delete('/applicants/{applicant}/delete', [ApplicantController::class, "destroy"])->name('applicants.destroy');
    Route::get("/applicants/detail_interviews/{interview}", [ApplicantController::class, "detailInterview"])->name("applicants.detailInterview");
    Route::get("/applicants/create/{applicant}", [ApplicantController::class, "createSchedule"])->name("applicants.create.schedule");
    Route::post("/applicants/store/{interview}", [ApplicantController::class, "storeSchedule"])->name("applicants.store.schedule");
    Route::get("/applicants/show/{applicant}", [ApplicantController::class, "showHistorySchedule"])->name("applicants.show.schedule");
    Route::put("/applicants/{interview}/update/interview",[ApplicantController::class, "update"])->name("applicants.update.interview");
    Route::put("/applicants/{detailInterview}/detail_interviews", [ApplicantController::class, "updateDetailInterview"])->name("applicants.update.detailInterview");
    
});


require __DIR__.'/auth.php';
