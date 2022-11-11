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
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->string("title");
            $table->enum("industry", ["marketing", "admin", "finance", "management"]);
            $table->enum("job_type", ["internship", "volunteer", "freelance", "part time", "full time", "contract"]);
            $table->enum("status", ["open", "close", "expired"])->default("open");
            $table->enum("location", ["surabaya", "sidoarjo", "gresik", "mojokerto"])->default("surabaya");
            $table->integer("total_applicants")->default(0);
            $table->integer("salary");
            $table->text("description");
            $table->text("skill");
            $table->text("qualifications");
            $table->string("created_by");
            $table->dateTime("close_on");
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
        Schema::dropIfExists('jobs');
    }
};
