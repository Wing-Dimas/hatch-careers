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
        Schema::create('detail_interviews', function (Blueprint $table) {
            $table->id();
            $table->enum("section", ['interview 1', 'interview 2', 'exam 1', 'exam 2', 'RNF']);
            $table->dateTime("interview_date");
            $table->enum("status", ['expired', 'progress', 'reschedule']);
            $table->foreignId("interview_id")->nullable()->constrained("interviews")->onUpdate('cascade')->onDelete('set null');
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
        Schema::dropIfExists('detail_interviews');
    }
};
