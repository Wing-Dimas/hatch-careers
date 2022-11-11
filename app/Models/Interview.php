<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Interview extends Model
{
    use HasFactory;

    protected $fillable = [
        'status',
        'applicant_id',
        'job_id'
    ];

    protected $guarded = [
        'id'
    ];

    public function applicant(){
        return $this->belongsTo(Applicant::class);
    }

    public function job(){
        return $this->belongsTo(Job::class);
    }

    public function detailInterview(){
        return $this->hasMany(DetailInterview::class);
    }
}
