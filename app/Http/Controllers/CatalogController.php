<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use App\Models\Job;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CatalogController extends Controller
{
    public function index(){
        return Inertia::render("catalog/Catalog", [
            "title" => "Catalog",
            "jobs" => Job::all()
        ]);
    }

    public function show(Job $job){
        $title = "Catalog Detail";
        return Inertia::render("catalog/CatalogDetail", compact("job", "title"));

    }

    public function create(Job $job){
        return Inertia::render("catalog/Create", ["job" => $job, "title" => "Apply Job"]);
    }

    public function store(Request $request, Job $job){
        // dd($request, $job);
        $request->validate([
            'email' => ['required', 'unique:applicants'],
            'name'  => ['required']
        ]);
        $applicant = Applicant::whereEmail($request->email)->first();
        if(!$applicant){
            $applicant = Applicant::create($request->all());
        }
        $jobId = ($applicant->interview()->whereJobId($job->id)->first());
        if(!$jobId){
            $applicant->interview()->create([
                'status' => 'progress',
                'job_id' => $job->id,
            ]);
            return response()->json(["message" => "success"]);
        }
        return response()->json(["message" => "error"]);
        // dd($id);
    }
}
