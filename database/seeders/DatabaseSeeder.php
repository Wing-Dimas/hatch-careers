<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(ApplicantSeeder::class);
        $this->call(JobSeeder::class);
        $this->call(RoleSeeder::class);
        $this->call(UserSeeder::class);
        // $this->call(InterviewSeeder::class);
    }
}
