<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Call extends Model
{
    protected $fillable = [
        'creator_id',
        'name',
        'description',
        'position'
    ];
}
