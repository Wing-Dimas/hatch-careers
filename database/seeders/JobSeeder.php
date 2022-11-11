<?php

namespace Database\Seeders;

use App\Models\Job;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Job::create([
            'title' => "Investment Assiation",
            'industry' => "finance",
            'job_type' => "full time",
            'status' => "open",
            'location' => "surabaya",
            // 'total_applicants' => "",
            'salary' => 10000000,
            'description' => fake()->text(800),
            'skill' => "business model canva",
            'qualifications' => "good looking",
            'created_by' => "arch",
            'close_on' => "2022-12-30 23:59:00",
        ]);
        Job::create([
            'title' => "System Business Analyst",
            'industry' => "finance",
            'job_type' => "full time",
            'status' => "close",
            'location' => "surabaya",
            // 'total_applicants' => "",
            'salary' => 15000000,
            'description' => fake()->text(800),
            'skill' => "bussinese model canva",
            'qualifications' => "good looking",
            'created_by' => "clara",
            'close_on' => "2022-08-30 23:59:00",
        ]);
    }
}
