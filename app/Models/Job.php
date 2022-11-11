<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'industry',
        'job_type',
        'status',
        'location',
        'total_applicants',
        'salary',
        'description',
        'skill',
        'qualifications',
        'created_by',
        'close_on',
    ];

    protected $guarded = [
        'id'
    ];

    public function interview(){
        return $this->hasMany(Interview::class);
    }
}
