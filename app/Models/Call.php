<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use MatanYadaev\EloquentSpatial\Objects\Point;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Call extends Model implements HasMedia
{
    use InteractsWithMedia;

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
