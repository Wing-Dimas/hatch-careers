<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $jobs = Job::all();
        $listIndustry = Job::distinct()->get(["industry"]);
        $listJobType = Job::distinct()->get(["job_type"]);
        $listStatus = Job::distinct()->get(["status"]);
        $listCreatedBy = Job::distinct()->get(["created_by"]);

        return Inertia::render("Jobs", compact("jobs", "listIndustry", "listJobType", "listStatus", "listCreatedBy"));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $job = $request->validate([
            "title" => "required",
            "description" => "required",
            "skill" => "required",
            "job_type" => "required",
            "qualifications" => "required",
            "salary" => "required",
            "location" => "required",
            "job_type" => "required",
            "industry" => "required",
            "close_on" => "required",
            "status" => "required",
            "created_by" => "required"
        ]);
        Job::create($job);
        return redirect()->back();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Job $job)
    {
        return response()->json($job);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Job $job)
    {
        $request->validate([
            "title" => "required",
            "description" => "required",
            "skill" => "required",
            "job_type" => "required",
            "qualifications" => "required",
            "salary" => "required",
            "location" => "required",
            "job_type" => "required",
            "industry" => "required",
            "close_on" => "required",
            "status" => "required",
        ]);
        $job->update($request->all());
        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Job $job)
    {
        $job->delete();
        return redirect()->back();
    }
}
