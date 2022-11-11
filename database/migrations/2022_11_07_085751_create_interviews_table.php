<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('interviews', function (Blueprint $table) {
            $table->id();
            $table->enum("status", ["progress", "terminate", "graduated"]);
            $table->foreignId("applicant_id")->nullable()->constrained("applicants")->onUpdate("cascade")->onDelete("set null");
            $table->foreignId("job_id")->nullable()->constrained("jobs")->onUpdate("cascade")->onDelete("set null");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('interviews');
    }
};
