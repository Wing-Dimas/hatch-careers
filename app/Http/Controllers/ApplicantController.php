<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use App\Models\DetailInterview;
use App\Models\Interview;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ApplicantController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $applicants = Applicant::all();
        $interviews = Interview::all();
        $jobs = Job::all();
        $detail_interviews = DetailInterview::all();
        return Inertia::render("Applicants", compact("applicants", "interviews", "jobs","detail_interviews"));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Applicant $applicant)
    {
        $data = DB::table('applicants')
        ->select(
            "applicants.*",
            "title",
            "interview_id",
            "interview_date",
            "section",
            "interviews.created_at AS apply_date",
            "salary",
            "interviews.status AS status"
        )
        ->join('interviews', 'interviews.applicant_id', '=', 'applicants.id')
        ->join('jobs', 'interviews.job_id', '=', 'jobs.id')
        ->join('detail_interviews', 'interviews.id','detail_interviews.interview_id')
        ->where('applicants.id', '=', $applicant->id)
        ->orderBy("interview_date", "desc")
        ->limit(1)
        ->get();

        return response()->json($data);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Interview $interview)
    {
        $interview->update($request->all());
        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Applicant $applicant)
    {
        $applicant->delete();
        return redirect()->back();
    }

    public function createSchedule(Applicant $applicant){
        $data = DB::table('applicants')
        ->select(
            "title",
            "name",
        )
        ->join('interviews', 'interviews.applicant_id', '=', 'applicants.id')
        ->join('jobs', 'interviews.job_id', '=', 'jobs.id')
        ->where('applicants.id', '=', $applicant->id)
        ->get();

        return response()->json($data);
    }

    public function storeSchedule(Request $request, Interview $interview){
        $detailInterview = $request->validate([
            "interview_date" => "required",
            "section" => "required"
        ]);
        $detailInterview["status"] = "progress";
        $detailInterview["interview_id"] = $interview->id;
        DetailInterview::create($detailInterview);
        return redirect()->back();
    }

    public function showHistorySchedule(Applicant $applicant){
        $data = DB::table('applicants')
        ->select(
            "detail_interviews.*"
        )
        ->join('interviews', 'interviews.applicant_id', '=', 'applicants.id')
        ->join('jobs', 'interviews.job_id', '=', 'jobs.id')
        ->join('detail_interviews', 'interviews.id','detail_interviews.interview_id')
        ->where('applicants.id', '=', $applicant->id)
        ->get();

        return response()->json($data);
    }

    public function updateDetailInterview(Request $request ,DetailInterview $detailInterview){
        $detailInterview->update($request->all());
        return redirect()->back();
    }
}
