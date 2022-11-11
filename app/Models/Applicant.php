<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Applicant extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'mobile_number'
    ];

    protected $guarded = [
        'id'
    ];

    public function interview(){
        return $this->hasMany(Interview::class);
    }
}
