<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailInterview extends Model
{
    use HasFactory;

    protected $fillable = [
        "section",
        "interview_date",
        "status",
        "interview_id",
    ];

    protected $guarded = [
        "id"
    ];

    public function interview(){
        return $this->belongsTo(Interview::class);
    }
}
