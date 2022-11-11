<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            "name" => 'fadil',
            "email" => 'admin@example.com',
            'password' => Hash::make("password"),
            'role_id' => 1
        ]);
        User::create([
            "name" => 'alfa',
            "email" => 'recruiter@example.com',
            'password' => Hash::make("password"),
            'role_id' => 2
        ]);
        User::create([
            "name" => 'atomic',
            "email" => 'director@example.com',
            'password' => Hash::make("password"),
            'role_id' => 3
        ]);
    }
}
