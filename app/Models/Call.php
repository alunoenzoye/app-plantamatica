<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use MatanYadaev\EloquentSpatial\Objects\Point;

class Call extends Model
{
    protected $fillable = [
        'creator_id',
        'name',
        'description',
        'position'
    ];

    protected $casts = [
        'position' => Point::class,
    ];
}
